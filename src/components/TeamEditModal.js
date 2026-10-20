import { useContext, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { RiArrowLeftRightLine, RiTeamFill } from 'react-icons/ri'
import { toast } from 'react-toastify'
import { ActiveLineupContext } from './ActiveLineupContext'
import './TeamEditModal.css'

const TeamEditModal = (props) => {
  const [show, setShow] = useState(false)
  const [showSwapModal, setShowSwapModal] = useState(false)
  const [swapSource, setSwapSource] = useState(null)
  const activeLineup = useContext(ActiveLineupContext)
  const toastOptions = { position: 'bottom-right' }

  const getTeamSlots = (team) => {
    const prefix = team === 'red' ? 'red' : 'yellow'

    return [1, 2, 3, 4, 5].map(number => ({
      key: `${prefix}${number}`,
      name: props[`${prefix}${number}Name`],
      id: props[`${prefix}${number}Id`]
    })).filter(slot => slot.id)
  }

  const teamCanSubstitute = (team) => getTeamSlots(team).length > 3
  const canSubstitute = teamCanSubstitute('red') || teamCanSubstitute('yellow')

  const getActiveQuizzers = (team) => team === 'red' ? activeLineup.activeRedQuizzers : activeLineup.activeYellowQuizzers

  const setActiveQuizzers = (team, quizzers) => {
    if (team === 'red') {
      activeLineup.setActiveRedQuizzers(quizzers)
    } else {
      activeLineup.setActiveYellowQuizzers(quizzers)
    }
  }

  const getQuizzerName = (team, quizzer) => getTeamSlots(team).find(slot => slot.key === quizzer).name

  const getQuizzerRole = (team, quizzer) => {
    const tableSeat = getActiveQuizzers(team).indexOf(quizzer)
    return tableSeat === -1 ? 'Substitute' : `Table seat ${tableSeat + 1}`
  }

  const getQuizzerOrder = (team) => {
    const selectedSlots = getTeamSlots(team)
    const activeQuizzers = getActiveQuizzers(team)
    const activeSlots = activeQuizzers.map(quizzer => selectedSlots.find(slot => slot.key === quizzer)).filter(Boolean)
    const substitutes = selectedSlots.filter(slot => !activeQuizzers.includes(slot.key))

    return [...activeSlots, ...substitutes]
  }

  const openSwapModal = (team, quizzer) => {
    if (!teamCanSubstitute(team)) {
      return
    }

    setSwapSource({ team, quizzer })
    setShowSwapModal(true)
  }

  const completeSwap = (targetQuizzer) => {
    if (!swapSource || !teamCanSubstitute(swapSource.team)) {
      return
    }

    const { team, quizzer: sourceQuizzer } = swapSource
    const activeQuizzers = getActiveQuizzers(team)
    const sourceSeat = activeQuizzers.indexOf(sourceQuizzer)
    const targetSeat = activeQuizzers.indexOf(targetQuizzer)

    if ((sourceSeat !== -1) === (targetSeat !== -1)) {
      return
    }

    const updatedQuizzers = [...activeQuizzers]

    if (sourceSeat !== -1) {
      updatedQuizzers[sourceSeat] = targetQuizzer
    } else {
      updatedQuizzers[targetSeat] = sourceQuizzer
    }

    setActiveQuizzers(team, updatedQuizzers)
    setShowSwapModal(false)
    setSwapSource(null)
    toast.info('The active lineup has been updated.', toastOptions)
  }

  const renderTeam = (team) => {
    const teamName = team === 'red' ? props.redName : props.yellowName

    return (
      <div className={`${team}-team-edit-container`}>
        <h1 className='team-edit-title'><RiTeamFill style={{ marginRight: '0.5rem' }} />{teamName}</h1>
        <div className={`team-builder team-builder-${team}`}>
          {getQuizzerOrder(team).map(slot => (
            <div className='confirmed-quizzer' key={slot.key}>
              <div>
                <p>{slot.name}</p>
                <span>{getQuizzerRole(team, slot.key)}</span>
              </div>
              {teamCanSubstitute(team) &&
                <button type='button' className='swap-button' aria-label={`Swap ${slot.name}`} title={`Swap ${slot.name}`} onClick={() => openSwapModal(team, slot.key)}>
                  <RiArrowLeftRightLine />
                </button>
              }
            </div>
          ))}
        </div>
      </div>
    )
  }

  const swapOptions = swapSource
    ? getTeamSlots(swapSource.team).filter(slot => {
      const activeQuizzers = getActiveQuizzers(swapSource.team)
      const sourceIsActive = activeQuizzers.includes(swapSource.quizzer)
      const targetIsActive = activeQuizzers.includes(slot.key)

      return slot.key !== swapSource.quizzer && sourceIsActive !== targetIsActive
    })
    : []

  return (
    <>
      {canSubstitute &&
        <>
          <button type='button' className='toolbar-button' onClick={() => setShow(true)}>Substitution</button>
          <Modal className='team-edit-modal' show={show} size='lg' centered onHide={() => setShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Substitution</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='team-edit-teams-container'>
                {renderTeam('red')}
                {renderTeam('yellow')}
              </div>
            </Modal.Body>
          </Modal>
        </>
      }
      <Modal show={showSwapModal} centered onHide={() => setShowSwapModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Swap Quizzer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {swapSource &&
            <div className='swap-modal-body'>
              <p>Who should {getQuizzerName(swapSource.team, swapSource.quizzer)} swap with?</p>
              <div className='swap-options'>
                {swapOptions.map(slot => (
                  <button type='button' key={slot.key} onClick={() => completeSwap(slot.key)}>{slot.name}</button>
                ))}
              </div>
            </div>
          }
        </Modal.Body>
      </Modal>
    </>
  )
}

export default TeamEditModal