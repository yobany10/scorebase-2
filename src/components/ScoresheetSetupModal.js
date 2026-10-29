import { useCallback, useContext, useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { toast } from 'react-toastify'
import { ActiveLineupContext } from './ActiveLineupContext'
import QuizzersList from './QuizzersList'
import QuizzerPicker from './QuizzerPicker'
import './ScoresheetSetupModal.css'
import { createQuizzer, deleteQuizzer as deleteStoredQuizzer, getLastTeamSetup, listQuizzers, saveLastTeamSetup } from '../storage/scorebaseDb'

const toastOptions = { position: 'bottom-right' }

const ScoresheetSetupModal = (props) => {
  const [quizzers, setQuizzers] = useState([])
  const [showAddQuizzerModal, setShowAddQuizzerModal] = useState(false)
  const [showClearFieldsModal, setShowClearFieldsModal] = useState(false)
  const activeLineup = useContext(ActiveLineupContext)
  const {
    setDivision,
    setRedName,
    setYellowName,
    setRed1Name,
    setRed1Id,
    setRed2Name,
    setRed2Id,
    setRed3Name,
    setRed3Id,
    setRed4Name,
    setRed4Id,
    setRed5Name,
    setRed5Id,
    setYellow1Name,
    setYellow1Id,
    setYellow2Name,
    setYellow2Id,
    setYellow3Name,
    setYellow3Id,
    setYellow4Name,
    setYellow4Id,
    setYellow5Name,
    setYellow5Id
  } = props

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

  const applyLastTeamSetup = useCallback((teamSetup, savedQuizzers) => {
    if (teamSetup.division) {
      setDivision(teamSetup.division)
    }
    setRedName(teamSetup.redName ?? 'Red')
    setYellowName(teamSetup.yellowName ?? 'Yellow')

    const slots = [
      { key: 'red1', fallbackName: 'R1', setName: setRed1Name, setId: setRed1Id },
      { key: 'red2', fallbackName: 'R2', setName: setRed2Name, setId: setRed2Id },
      { key: 'red3', fallbackName: 'R3', setName: setRed3Name, setId: setRed3Id },
      { key: 'red4', fallbackName: 'R4', setName: setRed4Name, setId: setRed4Id },
      { key: 'red5', fallbackName: 'R5', setName: setRed5Name, setId: setRed5Id },
      { key: 'yellow1', fallbackName: 'Y1', setName: setYellow1Name, setId: setYellow1Id },
      { key: 'yellow2', fallbackName: 'Y2', setName: setYellow2Name, setId: setYellow2Id },
      { key: 'yellow3', fallbackName: 'Y3', setName: setYellow3Name, setId: setYellow3Id },
      { key: 'yellow4', fallbackName: 'Y4', setName: setYellow4Name, setId: setYellow4Id },
      { key: 'yellow5', fallbackName: 'Y5', setName: setYellow5Name, setId: setYellow5Id }
    ]

    slots.forEach(slot => {
      const savedQuizzerId = teamSetup[`${slot.key}Id`]
      const quizzer = savedQuizzers.find(item => item.id === savedQuizzerId)
      slot.setId(quizzer ? quizzer.id : null)
      const savedName = teamSetup[`${slot.key}Name`]
      slot.setName(quizzer
        ? savedName || quizzer.fullName
        : savedQuizzerId == null
          ? savedName || slot.fallbackName
          : slot.fallbackName)
    })
  }, [
    setDivision,
    setRedName,
    setYellowName,
    setRed1Name,
    setRed1Id,
    setRed2Name,
    setRed2Id,
    setRed3Name,
    setRed3Id,
    setRed4Name,
    setRed4Id,
    setRed5Name,
    setRed5Id,
    setYellow1Name,
    setYellow1Id,
    setYellow2Name,
    setYellow2Id,
    setYellow3Name,
    setYellow3Id,
    setYellow4Name,
    setYellow4Id,
    setYellow5Name,
    setYellow5Id
  ])

  const loadQuizzers = async () => {
    const savedQuizzers = await listQuizzers()
    setQuizzers(savedQuizzers)
  }

  useEffect(() => {
    if (!props.showSetupModal) {
      return undefined
    }

    let isMounted = true

    const loadSetup = async () => {
      try {
        const [savedQuizzers, lastTeamSetup] = await Promise.all([listQuizzers(), getLastTeamSetup()])

        if (!isMounted) {
          return
        }

        setQuizzers(savedQuizzers)

        if (lastTeamSetup) {
          applyLastTeamSetup(lastTeamSetup, savedQuizzers)
        }
      } catch (error) {
        if (!isMounted) {
          return
        }

        console.error(error)
        toast.error('Unable to load your last team setup. Please try again.', toastOptions)
      }
    }

    loadSetup()

    return () => {
      isMounted = false
    }
  }, [props.showSetupModal, applyLastTeamSetup])

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

  const handleClearTeam = (team) => {
    const teamsToClear = team === 'both' ? ['red', 'yellow'] : [team]
    teamsToClear.forEach(teamName => {
      const isRedTeam = teamName === 'red'
      const setTeamName = isRedTeam ? props.setRedName : props.setYellowName
      setTeamName(isRedTeam ? 'Red' : 'Yellow')
      getTeamSlots(teamName).forEach(slot => {
        slot.setName(slot.fallbackName)
        slot.setId(null)
      })
    })
    setShowClearFieldsModal(false)
  }

  const handleSwapTeams = () => {
    const redSlots = getTeamSlots('red')
    const yellowSlots = getTeamSlots('yellow')
    const redName = props.redName
    const yellowName = props.yellowName

    props.setRedName(yellowName)
    props.setYellowName(redName)

    redSlots.forEach((redSlot, index) => {
      const yellowSlot = yellowSlots[index]
      redSlot.setName(yellowSlot.name)
      redSlot.setId(yellowSlot.id)
      yellowSlot.setName(redSlot.name)
      yellowSlot.setId(redSlot.id)
    })
  }

  const validateTeam = (team) => {
    const teamSlots = getTeamSlots(team)
    const selectedSlots = teamSlots.filter(slot => slot.id)
    const selectedIds = selectedSlots.map(slot => slot.id)

    if (new Set(selectedIds).size !== selectedIds.length) {
      toast.error(`Each quizzer can only be selected once for the ${team} team.`, toastOptions)
      return null
    }

    return { teamSlots, selectedSlots }
  }

  const prepareTeam = (team, teamName, { teamSlots, selectedSlots }) => {
    if (selectedSlots.length < 2) {
      const setupSlots = teamSlots.map(slot => {
        if (slot.id) {
          return slot
        }

        const generatedName = `${teamName} ${slot.key.slice(team.length)}`
        slot.setName(generatedName)
        slot.setId(null)
        return { ...slot, name: generatedName, id: null }
      })

      return {
        setupSlots,
        activeSlots: [...selectedSlots, ...setupSlots.filter(slot => !slot.id)]
      }
    }

    return {
      setupSlots: teamSlots,
      activeSlots: selectedSlots
    }
  }

  const handleSetupSubmit = async () => {
    const redName = (props.redName || '').trim() || 'Red'
    const yellowName = (props.yellowName || '').trim() || 'Yellow'
    const redValidation = validateTeam('red')
    const yellowValidation = validateTeam('yellow')

    if (!redValidation || !yellowValidation) {
      return
    }

    const redTeam = prepareTeam('red', redName, redValidation)
    const yellowTeam = prepareTeam('yellow', yellowName, yellowValidation)

    props.setRedName(redName)
    props.setYellowName(yellowName)

    const teamSetup = {
      division: props.division,
      redName,
      yellowName
    }
    ;[
      { team: 'red', setupSlots: redTeam.setupSlots },
      { team: 'yellow', setupSlots: yellowTeam.setupSlots }
    ].forEach(({ setupSlots }) => {
      setupSlots.forEach(slot => {
        teamSetup[`${slot.key}Name`] = slot.name
        teamSetup[`${slot.key}Id`] = slot.id
      })
    })

    try {
      await saveLastTeamSetup(teamSetup)
    } catch (error) {
      console.error(error)
      toast.error('Unable to remember this team setup for next time. The quiz will still start.', toastOptions)
    }

    activeLineup.setActiveRedQuizzers(redTeam.activeSlots.slice(0, 3).map(slot => slot.key))
    activeLineup.setActiveYellowQuizzers(yellowTeam.activeSlots.slice(0, 3).map(slot => slot.key))
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
        <button type='button' className='primary-button' onClick={() => setShowAddQuizzerModal(true)}>
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
            <button type='submit' className='primary-button'>Add Quizzer</button>
          </form>
        </Modal.Body>
      </Modal>
      <Modal show={showClearFieldsModal} centered onHide={() => setShowClearFieldsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Clear fields for which team?</Modal.Title>
        </Modal.Header>
        <Modal.Body className='quiz-setup-clear-options'>
          <button type='button' className='secondary-button' onClick={() => handleClearTeam('red')}>
            {(props.redName || 'Red').trim() || 'Red'}
          </button>
          <button type='button' className='secondary-button' onClick={() => handleClearTeam('yellow')}>
            {(props.yellowName || 'Yellow').trim() || 'Yellow'}
          </button>
          <button type='button' className='secondary-button' onClick={() => handleClearTeam('both')}>Both</button>
        </Modal.Body>
      </Modal>
      <div className='quiz-setup-body'>
        <div className='quiz-setup-controls'>
          <label className='quiz-setup-division'>
            Division
            <Form.Select value={props.division} onChange={event => props.setDivision(event.target.value)}>
              <option value='Beginner'>Beginner</option>
              <option value='Junior'>Junior</option>
              <option value='Intermediate'>Intermediate</option>
              <option value='Experienced'>Experienced</option>
            </Form.Select>
          </label>
          <button type='button' className='secondary-button' onClick={handleSwapTeams}>Flip teams</button>
          <button type='button' className='secondary-button' onClick={() => setShowClearFieldsModal(true)}>Clear fields</button>
        </div>
        <div className='quiz-setup-teams'>
          {renderTeamSetup('red')}
          {renderTeamSetup('yellow')}
        </div>
        <button type='button' className='primary-button' id='quiz-setup-submit-button' onClick={handleSetupSubmit}>Start Quiz</button>
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