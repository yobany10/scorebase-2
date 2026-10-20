import { useContext, useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { toast } from 'react-toastify'
import { ActiveLineupContext } from './ActiveLineupContext'
import QuizzersList from './QuizzersList'
import QuizzerPicker from './QuizzerPicker'
import './ScoresheetSetupModal.css'
import { createQuizzer, deleteQuizzer as deleteStoredQuizzer, listQuizzers } from '../storage/scorebaseDb'

const ScoresheetSetupModal = (props) => {
  const [quizzers, setQuizzers] = useState([])
  const [showAddQuizzerModal, setShowAddQuizzerModal] = useState(false)
  const activeLineup = useContext(ActiveLineupContext)
  const toastOptions = { position: 'bottom-right' }

  const getTeamSlots = (team) => {
    const prefix = team === 'red' ? 'red' : 'yellow'
    const label = team === 'red' ? 'Red' : 'Yellow'

    return [1, 2, 3, 4, 5].map(number => ({
      key: `${prefix}${number}`,
      fallbackName: `${team === 'red' ? 'R' : 'Y'}${number}`,
      name: props[`${prefix}${number}Name`],
      id: props[`${prefix}${number}Id`],
      setName: props[`set${label}${number}Name`],
      setId: props[`set${label}${number}Id`]
    }))
  }

  const loadQuizzers = async () => {
    const savedQuizzers = await listQuizzers()
    setQuizzers(savedQuizzers)
  }

  useEffect(() => {
    loadQuizzers()
  }, [])

  const handleQuizzerSelection = (slot, quizzerId) => {
    const quizzer = quizzers.find(item => item.id === quizzerId)
    slot.setName(quizzer ? quizzer.fullName : slot.fallbackName)
    slot.setId(quizzer ? quizzer.id : null)
  }

  const addQuizzer = async (event) => {
    event.preventDefault()
    const { firstName, lastName, division, dob } = event.target

    try {
      await createQuizzer({
        firstName: firstName.value,
        lastName: lastName.value,
        fullName: `${firstName.value} ${lastName.value}`,
        division: division.value,
        dob: dob.value
      })
      await loadQuizzers()
      event.target.reset()
      setShowAddQuizzerModal(false)
      toast.success('New quizzer added. They are now available to select.', toastOptions)
    } catch (error) {
      console.log(error)
      toast.error('Unable to add the quizzer. Please try again.', toastOptions)
    }
  }

  const deleteQuizzer = async (id) => {
    try {
      await deleteStoredQuizzer(id)
      await loadQuizzers()
      ;['red', 'yellow'].forEach(team => {
        getTeamSlots(team).forEach(slot => {
          if (slot.id === id) {
            slot.setName(slot.fallbackName)
            slot.setId(null)
          }
        })
      })
      toast.info('Quizzer deleted.', toastOptions)
    } catch (error) {
      console.log(error)
      toast.error('Unable to delete the quizzer. Please try again.', toastOptions)
    }
  }

  const handleQuizzerUpdated = async () => {
    await loadQuizzers()
  }

  const validateTeam = (team) => {
    const selectedSlots = getTeamSlots(team).filter(slot => slot.id)
    const selectedIds = selectedSlots.map(slot => slot.id)

    if (selectedSlots.length < 2) {
      toast.error(`Select at least two quizzers for the ${team} team.`, toastOptions)
      return null
    }

    if (new Set(selectedIds).size !== selectedIds.length) {
      toast.error(`Each quizzer can only be selected once for the ${team} team.`, toastOptions)
      return null
    }

    return selectedSlots
  }

  const handleSetupSubmit = () => {
    const redSlots = validateTeam('red')
    const yellowSlots = validateTeam('yellow')

    if (!redSlots || !yellowSlots) {
      return
    }

    activeLineup.setActiveRedQuizzers(redSlots.slice(0, 3).map(slot => slot.key))
    activeLineup.setActiveYellowQuizzers(yellowSlots.slice(0, 3).map(slot => slot.key))
    activeLineup.setTeamConfirmed({ red: true, yellow: true })
    props.setShowSetupModal(false)
  }

  const renderTeamSetup = (team) => {
    const teamName = team === 'red' ? 'Red' : 'Yellow'
    const slots = getTeamSlots(team)
    const selectedIds = slots.filter(slot => slot.id).map(slot => slot.id)

    return (
      <div className={`quiz-setup-team quiz-setup-team-${team}`}>
        <label className='quiz-setup-team-name'>
          {teamName} Team Name
          <input type='text' value={team === 'red' ? props.redName : props.yellowName} onChange={event => team === 'red' ? props.setRedName(event.target.value) : props.setYellowName(event.target.value)} required />
        </label>
        {slots.map(slot => (
          <div className='quiz-setup-slot' key={slot.key}>
            <label htmlFor={`quizzer-picker-${slot.key}`}>{teamName} {slot.key.replace(team, '')}</label>
            <QuizzerPicker
              id={`quizzer-picker-${slot.key}`}
              quizzers={quizzers}
              selectedQuizzerId={slot.id}
              unavailableQuizzerIds={selectedIds.filter(id => id !== slot.id)}
              onSelect={quizzerId => handleQuizzerSelection(slot, quizzerId)}
            />
          </div>
        ))}
      </div>
    )
  }

  if (!props.showSetupModal) {
    return null
  }

  return (
    <section className='quiz-setup-page' aria-labelledby='quiz-setup-title'>
      <div className='quiz-setup-header'>
        <h1 id='quiz-setup-title'>Quiz Setup</h1>
      </div>
      <section className='quiz-setup-add-quizzer' aria-labelledby='quiz-setup-add-quizzer-title'>
        <p>Setup your teams below using quizzer information you have saved.</p>
        <button type='button' className='submit-button' onClick={() => setShowAddQuizzerModal(true)}>
          {quizzers.length > 0 ? 'Add new quizzer' : 'Add your first quizzer'}
        </button>
      </section>
      <Modal show={showAddQuizzerModal} centered onHide={() => setShowAddQuizzerModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add a New Quizzer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='quiz-setup-add-quizzer-form' onSubmit={addQuizzer}>
            <label>First Name *<input type='text' name='firstName' required /></label>
            <label>Last Name *<input type='text' name='lastName' required /></label>
            <label>Division *
              <Form.Select name='division' defaultValue={props.division}>
                <option value='Beginner'>Beginner</option>
                <option value='Junior'>Junior</option>
                <option value='Intermediate'>Intermediate</option>
                <option value='Experienced'>Experienced</option>
              </Form.Select>
            </label>
            <label>Date of Birth<input type='date' name='dob' /></label>
            <button type='submit' className='submit-button'>Add Quizzer</button>
          </form>
        </Modal.Body>
      </Modal>
      <div className='quiz-setup-body'>
        <label className='quiz-setup-division'>
          Division
          <Form.Select value={props.division} onChange={event => props.setDivision(event.target.value)}>
            <option value='Beginner'>Beginner</option>
            <option value='Junior'>Junior</option>
            <option value='Intermediate'>Intermediate</option>
            <option value='Experienced'>Experienced</option>
          </Form.Select>
        </label>
        <div className='quiz-setup-teams'>
          {renderTeamSetup('red')}
          {renderTeamSetup('yellow')}
        </div>
        <button type='button' className='submit-button' id='quiz-setup-submit-button' onClick={handleSetupSubmit}>Start Quiz</button>
        {quizzers.length > 0 &&
          <div className='quiz-setup-my-quizzers'>
            <h2>My Quizzers</h2>
            <QuizzersList quizzers={quizzers} deleteQuizzer={deleteQuizzer} onQuizzerUpdated={handleQuizzerUpdated} />
          </div>
        }
      </div>
    </section>
  )
}

export default ScoresheetSetupModal