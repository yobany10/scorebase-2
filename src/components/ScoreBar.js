import React from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import './ScoreBar.css'

const ScoreBar = props => {

  const handleDropdownToggle = (isOpen) => {
    if (isOpen) {
      props.handle30()
    } else {
      props.handleClear()
    }
  }
    return (
        <div className='scorebar-div'>
            <h1 className='scorebar-r-score'>Red: {props.rScore}</h1>
            <ButtonGroup className='scorebar-r-actions'>
                <DropdownButton as={ButtonGroup} title="R1" id="bg-nested-dropdown" variant='secondary' onToggle={(isOpen) => handleDropdownToggle(isOpen)} onSelect={(event) => props.handleQuizzerAction(event)}>
                  <Dropdown.Item eventKey="R1-C-rscore" className='scorebar-menu-item'>Correct</Dropdown.Item>
                  <Dropdown.Item eventKey="R1-E-rscore" className='scorebar-menu-item'>Error</Dropdown.Item>
                  <Dropdown.Item eventKey="R1-F-rscore" className='scorebar-menu-item'>Foul</Dropdown.Item>
                </DropdownButton>
                <DropdownButton as={ButtonGroup} title="R2" id="bg-nested-dropdown" variant='secondary' onToggle={(isOpen) => handleDropdownToggle(isOpen)} onSelect={(event) => props.handleQuizzerAction(event)}>
                  <Dropdown.Item eventKey="R2-C-rscore" className='scorebar-menu-item'>Correct</Dropdown.Item>
                  <Dropdown.Item eventKey="R2-E-rscore" className='scorebar-menu-item'>Error</Dropdown.Item>
                  <Dropdown.Item eventKey="R2-F-rscore" className='scorebar-menu-item'>Foul</Dropdown.Item>
                </DropdownButton>
                <DropdownButton as={ButtonGroup} title="R3" id="bg-nested-dropdown" variant='secondary' onToggle={(isOpen) => handleDropdownToggle(isOpen)} onSelect={(event) => props.handleQuizzerAction(event)}>
                  <Dropdown.Item eventKey="R3-C-rscore" className='scorebar-menu-item'>Correct</Dropdown.Item>
                  <Dropdown.Item eventKey="R3-E-rscore" className='scorebar-menu-item'>Error</Dropdown.Item>
                  <Dropdown.Item eventKey="R3-F-rscore" className='scorebar-menu-item'>Foul</Dropdown.Item>
                </DropdownButton>
                <DropdownButton as={ButtonGroup} title="R4" id="bg-nested-dropdown" variant='secondary' onToggle={(isOpen) => handleDropdownToggle(isOpen)} onSelect={(event) => props.handleQuizzerAction(event)}>
                  <Dropdown.Item eventKey="R4-C-rscore" className='scorebar-menu-item'>Correct</Dropdown.Item>
                  <Dropdown.Item eventKey="R4-E-rscore" className='scorebar-menu-item'>Error</Dropdown.Item>
                  <Dropdown.Item eventKey="R4-F-rscore" className='scorebar-menu-item'>Foul</Dropdown.Item>
                </DropdownButton>
                <DropdownButton as={ButtonGroup} title="R5" id="bg-nested-dropdown" variant='secondary' onToggle={(isOpen) => handleDropdownToggle(isOpen)} onSelect={(event) => props.handleQuizzerAction(event)}>
                  <Dropdown.Item eventKey="R5-C-rscore" className='scorebar-menu-item'>Correct</Dropdown.Item>
                  <Dropdown.Item eventKey="R5-E-rscore" className='scorebar-menu-item'>Error</Dropdown.Item>
                  <Dropdown.Item eventKey="R5-F-rscore" className='scorebar-menu-item'>Foul</Dropdown.Item>
                </DropdownButton>
            </ButtonGroup>
            <ButtonGroup className='scorebar-y-actions'>
                <DropdownButton as={ButtonGroup} title="Y1" id="bg-nested-dropdown" variant='secondary' onToggle={(isOpen) => handleDropdownToggle(isOpen)} onSelect={(event) => props.handleQuizzerAction(event)}>
                  <Dropdown.Item eventKey="Y1-C-yscore" className='scorebar-menu-item'>Correct</Dropdown.Item>
                  <Dropdown.Item eventKey="Y1-E-yscore" className='scorebar-menu-item'>Error</Dropdown.Item>
                  <Dropdown.Item eventKey="Y1-F-yscore" className='scorebar-menu-item'>Foul</Dropdown.Item>
                </DropdownButton>
                <DropdownButton as={ButtonGroup} title="Y2" id="bg-nested-dropdown" variant='secondary' onToggle={(isOpen) => handleDropdownToggle(isOpen)} onSelect={(event) => props.handleQuizzerAction(event)}>
                  <Dropdown.Item eventKey="Y2-C-yscore" className='scorebar-menu-item'>Correct</Dropdown.Item>
                  <Dropdown.Item eventKey="Y2-E-yscore" className='scorebar-menu-item'>Error</Dropdown.Item>
                  <Dropdown.Item eventKey="Y2-F-yscore" className='scorebar-menu-item'>Foul</Dropdown.Item>
                </DropdownButton>
                <DropdownButton as={ButtonGroup} title="Y3" id="bg-nested-dropdown" variant='secondary' onToggle={(isOpen) => handleDropdownToggle(isOpen)} onSelect={(event) => props.handleQuizzerAction(event)}>
                  <Dropdown.Item eventKey="Y3-C-yscore" className='scorebar-menu-item'>Correct</Dropdown.Item>
                  <Dropdown.Item eventKey="Y3-E-yscore" className='scorebar-menu-item'>Error</Dropdown.Item>
                  <Dropdown.Item eventKey="Y3-F-yscore" className='scorebar-menu-item'>Foul</Dropdown.Item>
                </DropdownButton>
                <DropdownButton as={ButtonGroup} title="Y4" id="bg-nested-dropdown" variant='secondary' onToggle={(isOpen) => handleDropdownToggle(isOpen)} onSelect={(event) => props.handleQuizzerAction(event)}>
                  <Dropdown.Item eventKey="Y4-C-yscore" className='scorebar-menu-item'>Correct</Dropdown.Item>
                  <Dropdown.Item eventKey="Y4-E-yscore" className='scorebar-menu-item'>Error</Dropdown.Item>
                  <Dropdown.Item eventKey="Y4-F-yscore" className='scorebar-menu-item'>Foul</Dropdown.Item>
                </DropdownButton>
                <DropdownButton as={ButtonGroup} title="Y5" id="bg-nested-dropdown" variant='secondary' onToggle={(isOpen) => handleDropdownToggle(isOpen)} onSelect={(event) => props.handleQuizzerAction(event)}>
                  <Dropdown.Item eventKey="Y5-C-yscore" className='scorebar-menu-item'>Correct</Dropdown.Item>
                  <Dropdown.Item eventKey="Y5-E-yscore" className='scorebar-menu-item'>Error</Dropdown.Item>
                  <Dropdown.Item eventKey="Y5-F-yscore" className='scorebar-menu-item'>Foul</Dropdown.Item>
                </DropdownButton>
            </ButtonGroup>
            <h1 className='scorebar-y-score'>Yellow: {props.yScore}</h1>
        </div>
    )
}

export default ScoreBar