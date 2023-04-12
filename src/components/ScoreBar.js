import React, { useState } from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Form from 'react-bootstrap/Form';
import './ScoreBar.css'

const ScoreBar = props => {
  const [isShownR1, setIsShownR1] = useState(false)
  const [isShownR2, setIsShownR2] = useState(false)
  const [isShownR3, setIsShownR3] = useState(false)
  const [isShownR4, setIsShownR4] = useState(false)
  const [isShownR5, setIsShownR5] = useState(false)
  const [isShownY1, setIsShownY1] = useState(false)
  const [isShownY2, setIsShownY2] = useState(false)
  const [isShownY3, setIsShownY3] = useState(false)
  const [isShownY4, setIsShownY4] = useState(false)
  const [isShownY5, setIsShownY5] = useState(false)

  const handleDropdownToggle = (isOpen, quizzer) => {
    props.setIsPending(true)
    if (quizzer === 'r1') {
      if (isShownR1) {
        setIsShownR1(false)
      } else {
        setIsShownR1(true)
      }
    }
    if (quizzer === 'r2') {
      if (isShownR2) {
        setIsShownR2(false)
      } else {
        setIsShownR2(true)
      }
    }
    if (quizzer === 'r3') {
      if (isShownR3) {
        setIsShownR3(false)
      } else {
        setIsShownR3(true)
      }
    }
    if (quizzer === 'r4') {
      if (isShownR4) {
        setIsShownR4(false)
      } else {
        setIsShownR4(true)
      }
    }
    if (quizzer === 'r5') {
      if (isShownR5) {
        setIsShownR5(false)
      } else {
        setIsShownR5(true)
      }
    }
    if (quizzer === 'y1') {
      if (isShownY1) {
        setIsShownY1(false)
      } else {
        setIsShownY1(true)
      }
    }
    if (quizzer === 'y2') {
      if (isShownY2) {
        setIsShownY2(false)
      } else {
        setIsShownY2(true)
      }
    }
    if (quizzer === 'y3') {
      if (isShownY3) {
        setIsShownY3(false)
      } else {
        setIsShownY3(true)
      }
    }
    if (quizzer === 'y4') {
      if (isShownY4) {
        setIsShownY4(false)
      } else {
        setIsShownY4(true)
      }
    }
    if (quizzer === 'y5') {
      if (isShownY5) {
        setIsShownY5(false)
      } else {
        setIsShownY5(true)
      }
    }
    if (!props.isPending) {
      if (isOpen) {
        props.handle30()
      }
    }
  }
    return (
        <div className='scorebar-div'>
            <div className='scorebar-r-info-div'>
              <p className='scorebar-r-score'>{props.rScore}</p>
              {props.viewOnly && <p className='scorebar-r-name'>{props.redName}</p>}
              {!props.viewOnly && 
                <input className='scorebar-r-name' type='text' value={props.redName} onChange={(event) => {
                  const value = event.target.value 
                  props.handleNameChange('red', value)
                }} />
              }
            </div>
            {!props.viewOnly &&
            <ButtonGroup className='scorebar-r-actions'>
            <DropdownButton as={ButtonGroup} title='R1' id="bg-nested-dropdown" variant='secondary' show={isShownR1} onToggle={(isOpen) => handleDropdownToggle(isOpen, 'r1')}>
            <Form>
              <div key={`red1`} className="answer-checkbox">
                <Form.Check 
                  type={'checkbox'}
                  id={`red1-interruption`}
                  label={`interruption`}
                  checked={props.quizTableData[props.question - 1] === undefined ? true : props.quizTableData[props.question - 1]['red1'].interruption}
                  onChange={(event) => {
                    props.handleCheckboxChange(event)
                    props.setIsPending(false)
                  }
                }
                  />
                <Form.Check 
                  type={'checkbox'}
                  id={`red1-correct`}
                  label={`correct`}
                  checked={props.quizTableData[props.question - 1] === undefined ? true : props.quizTableData[props.question - 1]['red1'].correct}
                  onChange={(event) => {
                    if(props.quizTableData[props.question - 1]['red1'].correct === false) {
                      setIsShownR1(false)
                    }
                    props.handleClear()
                    props.handleCheckboxChange(event)
                    props.setIsPending(false)
                  }
                }
                  />
                <Form.Check 
                  type={'checkbox'}
                  id={`red1-error`}
                  label={`error`}
                  checked={props.quizTableData[props.question - 1] === undefined ? true : props.quizTableData[props.question - 1]['red1'].error}
                  onChange={(event) => {
                    if(props.quizTableData[props.question - 1]['red1'].error === false) {
                      setIsShownR1(false)
                    }
                    props.handleClear()
                    props.handleCheckboxChange(event)
                    props.setIsPending(false)
                  }
                }
                  />
                <Form.Check 
                  type={'checkbox'}
                  id={`red1-foul`}
                  label={`foul`}
                  checked={props.quizTableData[props.question - 1] === undefined ? true : props.quizTableData[props.question - 1]['red1'].foul}
                  onChange={(event) => {
                    props.handleCheckboxChange(event)
                    props.setIsPending(false)
                  }
                }
                  />
              </div>
            </Form>
            <p className='dropdown-quizzer-name'>{props.red1Name}</p>
            </DropdownButton>
            <DropdownButton as={ButtonGroup} title="R2" id="bg-nested-dropdown" variant='secondary' show={isShownR2} onToggle={(isOpen) => handleDropdownToggle(isOpen, 'r2')}>
            <Form>
              <div key={`red2`} className="answer-checkbox">
                <Form.Check 
                  type={'checkbox'}
                  id={`red2-interruption`}
                  label={`interruption`}
                  checked={props.quizTableData[props.question - 1] === undefined ? true : props.quizTableData[props.question - 1]['red2'].interruption}
                  onChange={(event) => {
                    props.handleCheckboxChange(event)
                    props.setIsPending(false)
                  }
                }
                  />
                <Form.Check 
                  type={'checkbox'}
                  id={`red2-correct`}
                  label={`correct`}
                  checked={props.quizTableData[props.question - 1] === undefined ? true : props.quizTableData[props.question - 1]['red2'].correct}
                  onChange={(event) => {
                    if(props.quizTableData[props.question - 1]['red2'].correct === false) {
                      setIsShownR2(false)
                    }
                    props.handleClear()
                    props.handleCheckboxChange(event)
                    props.setIsPending(false)
                  }
                }
                  />
                <Form.Check 
                  type={'checkbox'}
                  id={`red2-error`}
                  label={`error`}
                  checked={props.quizTableData[props.question - 1] === undefined ? true : props.quizTableData[props.question - 1]['red2'].error}
                  onChange={(event) => {
                    if(props.quizTableData[props.question - 1]['red2'].error === false) {
                      props.handleClear()
                      setIsShownR2(false)
                    }
                    props.handleCheckboxChange(event)
                    props.setIsPending(false)
                  }
                }
                  />
                <Form.Check 
                  type={'checkbox'}
                  id={`red2-foul`}
                  label={`foul`}
                  checked={props.quizTableData[props.question - 1] === undefined ? true : props.quizTableData[props.question - 1]['red2'].foul}
                  onChange={(event) => {
                    props.handleCheckboxChange(event)
                    props.setIsPending(false)
                  }
                }
                  />
              </div>
            </Form>
            <p className='dropdown-quizzer-name'>{props.red2Name}</p>
            </DropdownButton>
            <DropdownButton as={ButtonGroup} title="R3" id="bg-nested-dropdown" variant='secondary' show={isShownR3} onToggle={(isOpen) => handleDropdownToggle(isOpen, 'r3')}>
            <Form>
              <div key={`red3`} className="answer-checkbox">
                <Form.Check 
                  type={'checkbox'}
                  id={`red3-interruption`}
                  label={`interruption`}
                  checked={props.quizTableData[props.question - 1] === undefined ? true : props.quizTableData[props.question - 1]['red3'].interruption}
                  onChange={(event) => {
                    props.handleCheckboxChange(event)
                    props.setIsPending(false)
                  }
                }
                  />
                <Form.Check 
                  type={'checkbox'}
                  id={`red3-correct`}
                  label={`correct`}
                  checked={props.quizTableData[props.question - 1] === undefined ? true : props.quizTableData[props.question - 1]['red3'].correct}
                  onChange={(event) => {
                    if(props.quizTableData[props.question - 1]['red3'].correct === false) {
                      setIsShownR3(false)
                    }
                    props.handleClear()
                    props.handleCheckboxChange(event)
                    props.setIsPending(false)
                  }
                }
                  />
                <Form.Check 
                  type={'checkbox'}
                  id={`red3-error`}
                  label={`error`}
                  checked={props.quizTableData[props.question - 1] === undefined ? true : props.quizTableData[props.question - 1]['red3'].error}
                  onChange={(event) => {
                    if(props.quizTableData[props.question - 1]['red3'].error === false) {
                      props.handleClear()
                      setIsShownR3(false)
                    }
                    props.handleCheckboxChange(event)
                    props.setIsPending(false)
                  }
                }
                  />
                <Form.Check 
                  type={'checkbox'}
                  id={`red3-foul`}
                  label={`foul`}
                  checked={props.quizTableData[props.question - 1] === undefined ? true : props.quizTableData[props.question - 1]['red3'].foul}
                  onChange={(event) => {
                    props.handleCheckboxChange(event)
                    props.setIsPending(false)
                  }
                }
                  />
              </div>
            </Form>
            <p className='dropdown-quizzer-name'>{props.red3Name}</p>
            </DropdownButton>
            <DropdownButton as={ButtonGroup} title="R4" id="bg-nested-dropdown" variant='secondary' show={isShownR4} onToggle={(isOpen) => handleDropdownToggle(isOpen, 'r4')}>
            <Form>
              <div key={`red4`} className="answer-checkbox">
                <Form.Check 
                  type={'checkbox'}
                  id={`red4-interruption`}
                  label={`interruption`}
                  checked={props.quizTableData[props.question - 1] === undefined ? true : props.quizTableData[props.question - 1]['red4'].interruption}
                  onChange={(event) => {
                    props.handleCheckboxChange(event)
                    props.setIsPending(false)
                  }
                }
                  />
                <Form.Check 
                  type={'checkbox'}
                  id={`red4-correct`}
                  label={`correct`}
                  checked={props.quizTableData[props.question - 1] === undefined ? true : props.quizTableData[props.question - 1]['red4'].correct}
                  onChange={(event) => {
                    if(props.quizTableData[props.question - 1]['red4'].correct === false) {
                      setIsShownR4(false)
                    }
                    props.handleClear()
                    props.handleCheckboxChange(event)
                    props.setIsPending(false)
                  }
                }
                  />
                <Form.Check 
                  type={'checkbox'}
                  id={`red4-error`}
                  label={`error`}
                  checked={props.quizTableData[props.question - 1] === undefined ? true : props.quizTableData[props.question - 1]['red4'].error}
                  onChange={(event) => {
                    if(props.quizTableData[props.question - 1]['red4'].error === false) {
                      props.handleClear()
                      setIsShownR4(false)
                    }
                    props.handleCheckboxChange(event)
                    props.setIsPending(false)
                  }
                }
                  />
                <Form.Check 
                  type={'checkbox'}
                  id={`red4-foul`}
                  label={`foul`}
                  checked={props.quizTableData[props.question - 1] === undefined ? true : props.quizTableData[props.question - 1]['red4'].foul}
                  onChange={(event) => {
                    props.handleCheckboxChange(event)
                    props.setIsPending(false)
                  }
                }
                  />
              </div>
            </Form>
            <p className='dropdown-quizzer-name'>{props.red4Name}</p>
            </DropdownButton>
            <DropdownButton as={ButtonGroup} title="R5" id="bg-nested-dropdown" variant='secondary' show={isShownR5} onToggle={(isOpen) => handleDropdownToggle(isOpen, 'r5')}>
            <Form>
              <div key={`red5`} className="answer-checkbox">
                <Form.Check 
                  type={'checkbox'}
                  id={`red5-interruption`}
                  label={`interruption`}
                  checked={props.quizTableData[props.question - 1] === undefined ? true : props.quizTableData[props.question - 1]['red5'].interruption}
                  onChange={(event) => {
                    props.handleCheckboxChange(event)
                    props.setIsPending(false)
                  }
                }
                  />
                <Form.Check 
                  type={'checkbox'}
                  id={`red5-correct`}
                  label={`correct`}
                  checked={props.quizTableData[props.question - 1] === undefined ? true : props.quizTableData[props.question - 1]['red5'].correct}
                  onChange={(event) => {
                    if(props.quizTableData[props.question - 1]['red5'].correct === false) {
                      setIsShownR5(false)
                    }
                    props.handleClear()
                    props.handleCheckboxChange(event)
                    props.setIsPending(false)
                  }
                }
                  />
                <Form.Check 
                  type={'checkbox'}
                  id={`red5-error`}
                  label={`error`}
                  checked={props.quizTableData[props.question - 1] === undefined ? true : props.quizTableData[props.question - 1]['red5'].error}
                  onChange={(event) => {
                    if(props.quizTableData[props.question - 1]['red5'].error === false) {
                      props.handleClear()
                      setIsShownR5(false)
                    }
                    props.handleCheckboxChange(event)
                    props.setIsPending(false)
                  }
                }
                  />
                <Form.Check 
                  type={'checkbox'}
                  id={`red5-foul`}
                  label={`foul`}
                  checked={props.quizTableData[props.question - 1] === undefined ? true : props.quizTableData[props.question - 1]['red5'].foul}
                  onChange={(event) => {
                    props.handleCheckboxChange(event)
                    props.setIsPending(false)
                  }
                }
                  />
              </div>
            </Form>
            <p className='dropdown-quizzer-name'>{props.red5Name}</p>
            </DropdownButton>
            </ButtonGroup>
            }
            {!props.viewOnly && 
            <ButtonGroup className='scorebar-y-actions'>
            <DropdownButton as={ButtonGroup} title="Y1" id="bg-nested-dropdown" variant='secondary' show={isShownY1} onToggle={(isOpen) => handleDropdownToggle(isOpen, 'y1')}>
                <Form>
                  <div key={`yellow1`} className="answer-checkbox">
                    <Form.Check 
                      type={'checkbox'}
                      id={`yellow1-interruption`}
                      label={`interruption`}
                      checked={props.quizTableData[props.question - 1] === undefined ? true : props.quizTableData[props.question - 1]['yellow1'].interruption}
                      onChange={(event) => {
                        props.handleCheckboxChange(event)
                        props.setIsPending(false)
                      }
                    }
                      />
                    <Form.Check 
                      type={'checkbox'}
                      id={`yellow1-correct`}
                      label={`correct`}
                      checked={props.quizTableData[props.question - 1] === undefined ? true : props.quizTableData[props.question - 1]['yellow1'].correct}
                      onChange={(event) => {
                        if(props.quizTableData[props.question - 1]['yellow1'].correct === false) {
                          setIsShownY1(false)
                        }
                        props.handleClear()
                        props.handleCheckboxChange(event)
                        props.setIsPending(false)
                      }
                    }
                      />
                    <Form.Check 
                      type={'checkbox'}
                      id={`yellow1-error`}
                      label={`error`}
                      checked={props.quizTableData[props.question - 1] === undefined ? true : props.quizTableData[props.question - 1]['yellow1'].error}
                      onChange={(event) => {
                        if(props.quizTableData[props.question - 1]['yellow1'].error === false) {
                          props.handleClear()
                          setIsShownY1(false)
                        }
                        props.handleCheckboxChange(event)
                        props.setIsPending(false)
                      }
                    }
                      />
                    <Form.Check 
                      type={'checkbox'}
                      id={`yellow1-foul`}
                      label={`foul`}
                      checked={props.quizTableData[props.question - 1] === undefined ? true : props.quizTableData[props.question - 1]['yellow1'].foul}
                      onChange={(event) => {
                        props.handleCheckboxChange(event)
                        props.setIsPending(false)
                      }
                    }
                      />
                  </div>
                </Form>
            <p className='dropdown-quizzer-name'>{props.yellow1Name}</p>
                </DropdownButton>
                <DropdownButton as={ButtonGroup} title="Y2" id="bg-nested-dropdown" variant='secondary' show={isShownY2} onToggle={(isOpen) => handleDropdownToggle(isOpen, 'y2')}>
                <Form>
                  <div key={`yellow2`} className="answer-checkbox">
                    <Form.Check 
                      type={'checkbox'}
                      id={`yellow2-interruption`}
                      label={`interruption`}
                      checked={props.quizTableData[props.question - 1] === undefined ? true : props.quizTableData[props.question - 1]['yellow2'].interruption}
                      onChange={(event) => {
                        props.handleCheckboxChange(event)
                        props.setIsPending(false)
                      }
                    }
                      />
                    <Form.Check 
                      type={'checkbox'}
                      id={`yellow2-correct`}
                      label={`correct`}
                      checked={props.quizTableData[props.question - 1] === undefined ? true : props.quizTableData[props.question - 1]['yellow2'].correct}
                      onChange={(event) => {
                        if(props.quizTableData[props.question - 1]['yellow2'].correct === false) {
                          setIsShownY2(false)
                        }
                        props.handleClear()
                        props.handleCheckboxChange(event)
                        props.setIsPending(false)
                      }
                    }
                      />
                    <Form.Check 
                      type={'checkbox'}
                      id={`yellow2-error`}
                      label={`error`}
                      checked={props.quizTableData[props.question - 1] === undefined ? true : props.quizTableData[props.question - 1]['yellow2'].error}
                      onChange={(event) => {
                        if(props.quizTableData[props.question - 1]['yellow2'].error === false) {
                          props.handleClear()
                          setIsShownY2(false)
                        }
                        props.handleCheckboxChange(event)
                        props.setIsPending(false)
                      }
                    }
                      />
                    <Form.Check 
                      type={'checkbox'}
                      id={`yellow2-foul`}
                      label={`foul`}
                      checked={props.quizTableData[props.question - 1] === undefined ? true : props.quizTableData[props.question - 1]['yellow2'].foul}
                      onChange={(event) => {
                        props.handleCheckboxChange(event)
                        props.setIsPending(false)
                      }
                    }
                      />
                  </div>
                </Form>
                <p className='dropdown-quizzer-name'>{props.yellow2Name}</p>
                </DropdownButton>
                <DropdownButton as={ButtonGroup} title="Y3" id="bg-nested-dropdown" variant='secondary' show={isShownY3} onToggle={(isOpen) => handleDropdownToggle(isOpen, 'y3')}>
                <Form>
                  <div key={`yellow3`} className="answer-checkbox">
                    <Form.Check 
                      type={'checkbox'}
                      id={`yellow3-interruption`}
                      label={`interruption`}
                      checked={props.quizTableData[props.question - 1] === undefined ? true : props.quizTableData[props.question - 1]['yellow3'].interruption}
                      onChange={(event) => {
                        props.handleCheckboxChange(event)
                        props.setIsPending(false)
                      }
                    }
                      />
                    <Form.Check 
                      type={'checkbox'}
                      id={`yellow3-correct`}
                      label={`correct`}
                      checked={props.quizTableData[props.question - 1] === undefined ? true : props.quizTableData[props.question - 1]['yellow3'].correct}
                      onChange={(event) => {
                        if(props.quizTableData[props.question - 1]['yellow3'].correct === false) {
                          setIsShownY3(false)
                        }
                        props.handleClear()
                        props.handleCheckboxChange(event)
                        props.setIsPending(false)
                      }
                    }
                      />
                    <Form.Check 
                      type={'checkbox'}
                      id={`yellow3-error`}
                      label={`error`}
                      checked={props.quizTableData[props.question - 1] === undefined ? true : props.quizTableData[props.question - 1]['yellow3'].error}
                      onChange={(event) => {
                        if(props.quizTableData[props.question - 1]['yellow3'].error === false) {
                          props.handleClear()
                          setIsShownY3(false)
                        }
                        props.handleCheckboxChange(event)
                        props.setIsPending(false)
                      }
                    }
                      />
                    <Form.Check 
                      type={'checkbox'}
                      id={`yellow3-foul`}
                      label={`foul`}
                      checked={props.quizTableData[props.question - 1] === undefined ? true : props.quizTableData[props.question - 1]['yellow3'].foul}
                      onChange={(event) => {
                        props.handleCheckboxChange(event)
                        props.setIsPending(false)
                      }
                    }
                      />
                  </div>
                </Form>
                <p className='dropdown-quizzer-name'>{props.yellow3Name}</p>
                </DropdownButton>
                <DropdownButton as={ButtonGroup} title="Y4" id="bg-nested-dropdown" variant='secondary' show={isShownY4} onToggle={(isOpen) => handleDropdownToggle(isOpen, 'y4')}>
                <Form>
                  <div key={`yellow4`} className="answer-checkbox">
                    <Form.Check 
                      type={'checkbox'}
                      id={`yellow4-interruption`}
                      label={`interruption`}
                      checked={props.quizTableData[props.question - 1] === undefined ? true : props.quizTableData[props.question - 1]['yellow4'].interruption}
                      onChange={(event) => {
                        props.handleCheckboxChange(event)
                        props.setIsPending(false)
                      }
                    }
                      />
                    <Form.Check 
                      type={'checkbox'}
                      id={`yellow4-correct`}
                      label={`correct`}
                      checked={props.quizTableData[props.question - 1] === undefined ? true : props.quizTableData[props.question - 1]['yellow4'].correct}
                      onChange={(event) => {
                        if(props.quizTableData[props.question - 1]['yellow4'].correct === false) {
                          setIsShownY4(false)
                        }
                        props.handleClear()
                        props.handleCheckboxChange(event)
                        props.setIsPending(false)
                      }
                    }
                      />
                    <Form.Check 
                      type={'checkbox'}
                      id={`yellow4-error`}
                      label={`error`}
                      checked={props.quizTableData[props.question - 1] === undefined ? true : props.quizTableData[props.question - 1]['yellow4'].error}
                      onChange={(event) => {
                        if(props.quizTableData[props.question - 1]['yellow4'].error === false) {
                          props.handleClear()
                          setIsShownY4(false)
                        }
                        props.handleCheckboxChange(event)
                        props.setIsPending(false)
                      }
                    }
                      />
                    <Form.Check 
                      type={'checkbox'}
                      id={`yellow4-foul`}
                      label={`foul`}
                      checked={props.quizTableData[props.question - 1] === undefined ? true : props.quizTableData[props.question - 1]['yellow4'].foul}
                      onChange={(event) => {
                        props.handleCheckboxChange(event)
                        props.setIsPending(false)
                      }
                    }
                      />
                  </div>
                </Form>
                <p className='dropdown-quizzer-name'>{props.yellow4Name}</p>
                </DropdownButton>
                <DropdownButton as={ButtonGroup} title="Y5" id="bg-nested-dropdown" variant='secondary' show={isShownY5} onToggle={(isOpen) => handleDropdownToggle(isOpen, 'y5')}>
                <Form>
                  <div key={`yellow5`} className="answer-checkbox">
                    <Form.Check 
                      type={'checkbox'}
                      id={`yellow5-interruption`}
                      label={`interruption`}
                      checked={props.quizTableData[props.question - 1] === undefined ? true : props.quizTableData[props.question - 1]['yellow5'].interruption}
                      onChange={(event) => {
                        props.handleCheckboxChange(event)
                        props.setIsPending(false)
                      }
                    }
                      />
                    <Form.Check 
                      type={'checkbox'}
                      id={`yellow5-correct`}
                      label={`correct`}
                      checked={props.quizTableData[props.question - 1] === undefined ? true : props.quizTableData[props.question - 1]['yellow5'].correct}
                      onChange={(event) => {
                        if(props.quizTableData[props.question - 1]['yellow5'].correct === false) {
                          setIsShownY5(false)
                        }
                        props.handleClear()
                        props.handleCheckboxChange(event)
                        props.setIsPending(false)
                      }
                    }
                      />
                    <Form.Check 
                      type={'checkbox'}
                      id={`yellow5-error`}
                      label={`error`}
                      checked={props.quizTableData[props.question - 1] === undefined ? true : props.quizTableData[props.question - 1]['yellow5'].error}
                      onChange={(event) => {
                        if(props.quizTableData[props.question - 1]['yellow5'].error === false) {
                          props.handleClear()
                          setIsShownY5(false)
                        }
                        props.handleCheckboxChange(event)
                        props.setIsPending(false)
                      }
                    }
                      />
                    <Form.Check 
                      type={'checkbox'}
                      id={`yellow5-foul`}
                      label={`foul`}
                      checked={props.quizTableData[props.question - 1] === undefined ? true : props.quizTableData[props.question - 1]['yellow5'].foul}
                      onChange={(event) => {
                        props.handleCheckboxChange(event)
                        props.setIsPending(false)
                      }
                    }
                      />
                  </div>
                </Form>
                <p className='dropdown-quizzer-name'>{props.yellow5Name}</p>
                </DropdownButton>
            </ButtonGroup>
            }
            <div className='scorebar-y-info-div'>
              <p className='scorebar-y-score'>{props.yScore}</p>
              {props.viewOnly && <p className='scorebar-y-name'>{props.yellowName}</p>}
              {!props.viewOnly && 
                <input className='scorebar-y-name' type='text' value={props.yellowName} onChange={(event) => {
                  const value = event.target.value 
                  props.handleNameChange('yellow', value)
                }} />
              }
            </div>
        </div>
    )
}

export default ScoreBar