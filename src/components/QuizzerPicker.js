import { useEffect, useRef, useState } from 'react'
import { RiCloseLine } from 'react-icons/ri'
import './QuizzerPicker.css'

const QuizzerPicker = ({ id, quizzers, selectedQuizzerId, unavailableQuizzerIds, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const pickerRef = useRef(null)
  const selectedQuizzer = quizzers.find(quizzer => quizzer.id === selectedQuizzerId)
  const normalizedSearchTerm = searchTerm.trim().toLocaleLowerCase()
  const availableQuizzers = quizzers.filter(quizzer => quizzer.id === selectedQuizzerId || !unavailableQuizzerIds.includes(quizzer.id))
  const filteredQuizzers = availableQuizzers.filter(quizzer => quizzer.fullName.toLocaleLowerCase().includes(normalizedSearchTerm))

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (!pickerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleDocumentClick)
    return () => document.removeEventListener('click', handleDocumentClick)
  }, [])

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsOpen(false)
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsOpen(false)
    }
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    if (selectedQuizzerId) {
      onSelect('')
    }
    setIsOpen(true)
  }

  const chooseQuizzer = (quizzerId) => {
    onSelect(quizzerId)
    setSearchTerm('')
    setIsOpen(false)
  }

  return (
    <div ref={pickerRef} className='quizzer-picker' onBlur={handleBlur} onKeyDown={handleKeyDown}>
      <div className='quizzer-picker-input-row'>
        <input
          id={id}
          type='search'
          value={searchTerm}
          placeholder={selectedQuizzer ? selectedQuizzer.fullName : 'Search quizzers'}
          autoComplete='off'
          role='combobox'
          aria-autocomplete='list'
          aria-controls={`${id}-options`}
          aria-expanded={isOpen}
          onFocus={() => setIsOpen(true)}
          onChange={handleSearchChange}
        />
        {selectedQuizzer &&
          <button type='button' className='quizzer-picker-clear' aria-label={`Clear ${selectedQuizzer.fullName}`} onClick={() => chooseQuizzer('')}>
            <RiCloseLine aria-hidden='true' />
          </button>
        }
      </div>
      {isOpen &&
        <ul id={`${id}-options`} className='quizzer-picker-menu' role='listbox'>
          <li>
            <button type='button' role='option' aria-selected={!selectedQuizzerId} onMouseDown={event => event.preventDefault()} onClick={() => chooseQuizzer('')}>
              No quizzer selected
            </button>
          </li>
          {filteredQuizzers.map(quizzer => (
            <li key={quizzer.id}>
              <button type='button' role='option' aria-selected={quizzer.id === selectedQuizzerId} onMouseDown={event => event.preventDefault()} onClick={() => chooseQuizzer(quizzer.id)}>
                {quizzer.fullName}
              </button>
            </li>
          ))}
          {filteredQuizzers.length === 0 &&
            <li className='quizzer-picker-empty'>No matching quizzers</li>
          }
        </ul>
      }
    </div>
  )
}

export default QuizzerPicker