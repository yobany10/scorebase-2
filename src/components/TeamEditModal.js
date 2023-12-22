import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import {collection, doc, addDoc, deleteDoc, onSnapshot, query, where, orderBy, serverTimestamp} from 'firebase/firestore'
import {auth, db} from '../Firebase/config'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {RiTeamFill} from 'react-icons/ri'
import QuizzersList from './QuizzersList'
import './TeamEditModal.css'

const TeamEditModal = (props) => {
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [quizzers, setQuizzers] = useState([])
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate()

  const handleShow = (breakpoint) => {
    setFullscreen(breakpoint);
    setShow(true);
  }

  function getQuizzers () {
    const q = query(collection(db, 'quizzers'), where('createdByUser', '==', `${user.uid}`), orderBy('firstName', 'asc'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        // querySnapshot.docs.map(doc => console.log(doc.data()))
        setQuizzers(querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    })
    return unsubscribe
  }

// See if user is logged
const checkAuth = async () => {
  if (user) {
      getQuizzers()
      return;
  }
  if (loading) return;
  if (!user) return navigate('/login')
}

useEffect(() => {
  checkAuth()
},[user, loading])

const toastOptions = {
  position: 'bottom-right'
}

const addQuizzer = async (e) => {
  e.preventDefault()
  let firstName = e.target.firstName.value
  let lastName = e.target.lastName.value
  let division = e.target.division.value
  let dob = e.target.dob.value
  try {
    const quizzersRef = collection(db, 'quizzers')
    await addDoc(quizzersRef, {
      firstName: firstName,
      lastName: lastName,
      fullName: `${firstName} ${lastName}`,
      createdByUser: user.uid,
      createdByUserName: user.displayName,
      division: division,
      dob: dob,
      created: serverTimestamp()
    })
  } catch (error) {
    console.log(error)
  }
  e.target.firstName.value = ''
  e.target.lastName.value = ''
  e.target.dob.value = ''
  toast.info('New quizzer was added', toastOptions)
}

const deleteQuizzer = async (id) => {
  try {
    await deleteDoc(doc(db, 'quizzers', id))
    if (id == props.red1Id) {
      props.setRed1Name('R1')
      props.setRed1Id(null)
    } else if (id == props.red2Id) {
      props.setRed2Name('R2')
      props.setRed2Id(null)
    } else if (id == props.red3Id) {
      props.setRed3Name('R3')
      props.setRed3Id(null)
    } else if (id == props.red4Id) {
      props.setRed4Name('R4')
      props.setRed4Id(null)
    } else if (id == props.red5Id) {
      props.setRed5Name('R5')
      props.setRed5Id(null)
    } else if (id == props.yellow1Id) {
      props.setYellow1Name('Y1')
      props.setYellow1Id(null)
    } else if (id == props.yellow2Id) {
      props.setYellow2Name('Y2')
      props.setYellow2Id(null)
    } else if (id == props.yellow3Id) {
      props.setYellow3Name('Y3')
      props.setYellow3Id(null)
    } else if (id == props.yellow4Id) {
      props.setYellow4Name('Y4')
      props.setYellow4Id(null)
    } else if (id == props.yellow5Id) {
      props.setYellow5Name('Y5')
      props.setYellow5Id(null)
    } else {
      return
    }
  } catch (error) {
    console.log(error)
  }
}

  return (
    <>
    <button type='button' className="toolbar-button" onClick={() => handleShow(true)}>
      Edit Teams
    </button>
      <Modal className='team-edit-modal' show={show} size='lg' onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Teams</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='team-edit-body'>
          <div className='team-edit-teams-container'>
            <div className='red-team-edit-container'>
              <h1 className='team-edit-title'><RiTeamFill style={{marginRight: '0.5rem'}} />Red Team</h1>
                <form className='edit-teams-form' style={{borderTop: '4px solid red'}} >
                  <label>
                    Red 1 Name
                    <Form.Select value={props.red1Name} onChange={(e) => {
                      const index = e.target.options.selectedIndex
                      // console.log(e.target.options[index].getAttribute('data-quizzerid'))
                      props.setRed1Name(e.target.value)
                      props.setRed1Id(e.target.options[index].getAttribute('data-quizzerid'))
                    }}>
                      <option>R1</option>
                      {quizzers != [] && quizzers.map(item => {
                        return <option key={item.id} data-quizzerid={item.id} value={item.fullName}>{item.fullName}</option>  
                      })}
                    </Form.Select>
                  </label>
                  <label>
                    Red 2 Name
                    <Form.Select value={props.red2Name} onChange={(e) => {
                      const index = e.target.options.selectedIndex
                      console.log(e.target.options[index].getAttribute('data-quizzerid'))
                      props.setRed2Name(e.target.value)
                      props.setRed2Id(e.target.options[index].getAttribute('data-quizzerid'))
                    }}>
                      <option>R2</option>
                      {quizzers != [] && quizzers.map(item => {
                        return <option key={item.id} data-quizzerid={item.id} value={item.fullName}>{item.fullName}</option>  
                      })}
                    </Form.Select>
                  </label>
                  <label>
                    Red 3 Name
                    <Form.Select value={props.red3Name} onChange={(e) => {
                      const index = e.target.options.selectedIndex
                      console.log(e.target.options[index].getAttribute('data-quizzerid'))
                      props.setRed3Name(e.target.value)
                      props.setRed3Id(e.target.options[index].getAttribute('data-quizzerid'))
                    }}>
                      <option>R3</option>
                      {quizzers != [] && quizzers.map(item => {
                        return <option key={item.id} data-quizzerid={item.id} value={item.fullName}>{item.fullName}</option>  
                      })}
                    </Form.Select>
                  </label>
                  <label>
                    Red 4 Name
                    <Form.Select value={props.red4Name} onChange={(e) => {
                      const index = e.target.options.selectedIndex
                      console.log(e.target.options[index].getAttribute('data-quizzerid'))
                      props.setRed4Name(e.target.value)
                      props.setRed4Id(e.target.options[index].getAttribute('data-quizzerid'))
                    }}>
                      <option>R4</option>
                      {quizzers != [] && quizzers.map(item => {
                        return <option key={item.id} data-quizzerid={item.id} value={item.fullName}>{item.fullName}</option>  
                      })}
                    </Form.Select>
                  </label>
                  <label>
                    Red 5 Name
                    <Form.Select value={props.red5Name} onChange={(e) => {
                      const index = e.target.options.selectedIndex
                      console.log(e.target.options[index].getAttribute('data-quizzerid'))
                      props.setRed5Name(e.target.value)
                      props.setRed5Id(e.target.options[index].getAttribute('data-quizzerid'))
                    }}>
                      <option>R5</option>
                      {quizzers != [] && quizzers.map(item => {
                        return <option key={item.id} data-quizzerid={item.id} value={item.fullName}>{item.fullName}</option>  
                      })}
                    </Form.Select>
                  </label>
                </form>
            </div>
            <div className='yellow-team-edit-container'>
              <h1 className='team-edit-title'><RiTeamFill style={{marginRight: '0.5rem'}} />Yellow Team</h1>
                <form className='edit-teams-form' style={{borderTop: '4px solid yellow'}} >
                <label>
                    Yellow 1 Name
                    <Form.Select value={props.yellow1Name} onChange={(e) => {
                      const index = e.target.options.selectedIndex
                      console.log(e.target.options[index].getAttribute('data-quizzerid'))
                      props.setYellow1Name(e.target.value)
                      props.setYellow1Id(e.target.options[index].getAttribute('data-quizzerid'))
                    }}>
                      <option>Y1</option>
                      {quizzers != [] && quizzers.map(item => {
                        return <option key={item.id} data-quizzerid={item.id} value={item.fullName}>{item.fullName}</option>  
                      })}
                    </Form.Select>
                  </label>
                  <label>
                    Yellow 2 Name
                    <Form.Select value={props.yellow2Name} onChange={(e) => {
                      const index = e.target.options.selectedIndex
                      console.log(e.target.options[index].getAttribute('data-quizzerid'))
                      props.setYellow2Name(e.target.value)
                      props.setYellow2Id(e.target.options[index].getAttribute('data-quizzerid'))
                    }}>
                      <option>Y2</option>
                      {quizzers != [] && quizzers.map(item => {
                        return <option key={item.id} data-quizzerid={item.id} value={item.fullName}>{item.fullName}</option>  
                      })}
                    </Form.Select>
                  </label>
                  <label>
                    Yellow 3 Name
                    <Form.Select value={props.yellow3Name} onChange={(e) => {
                      const index = e.target.options.selectedIndex
                      console.log(e.target.options[index].getAttribute('data-quizzerid'))
                      props.setYellow3Name(e.target.value)
                      props.setYellow3Id(e.target.options[index].getAttribute('data-quizzerid'))
                    }}>
                      <option>Y3</option>
                      {quizzers != [] && quizzers.map(item => {
                        return <option key={item.id} data-quizzerid={item.id} value={item.fullName}>{item.fullName}</option>  
                      })}
                    </Form.Select>
                  </label>
                  <label>
                    Yellow 4 Name
                    <Form.Select value={props.yellow4Name} onChange={(e) => {
                      const index = e.target.options.selectedIndex
                      console.log(e.target.options[index].getAttribute('data-quizzerid'))
                      props.setYellow4Name(e.target.value)
                      props.setYellow4Id(e.target.options[index].getAttribute('data-quizzerid'))
                    }}>
                      <option>Y4</option>
                      {quizzers != [] && quizzers.map(item => {
                        return <option key={item.id} data-quizzerid={item.id} value={item.fullName}>{item.fullName}</option>  
                      })}
                    </Form.Select>
                  </label>
                  <label>
                    Yellow 5 Name
                    <Form.Select value={props.yellow5Name} onChange={(e) => {
                      const index = e.target.options.selectedIndex
                      console.log(e.target.options[index].getAttribute('data-quizzerid'))
                      props.setYellow5Name(e.target.value)
                      props.setYellow5Id(e.target.options[index].getAttribute('data-quizzerid'))
                    }}>
                      <option>Y5</option>
                      {quizzers != [] && quizzers.map(item => {
                        return <option key={item.id} data-quizzerid={item.id} value={item.fullName}>{item.fullName}</option>  
                      })}
                    </Form.Select>
                  </label>
                </form>
            </div>
          </div>
          <div className='team-edit-create-quizzer'>
              <h1 className='team-edit-title'>Add a New Quizzer</h1>
              <form className='team-edit-create-quizzer-form' onSubmit={(e) => addQuizzer(e)}>
                <label>
                  First Name *
                  <input type='text' name='firstName' required className='edit-teams-input' />
                </label>
                <label>
                  Last Name *
                  <input type='text' name='lastName' required className='edit-teams-input' />
                </label>
                <label>
                  Division *
                  <Form.Select name='division' defaultValue='Intermediate'>
                    <option value='Beginner'>Beginner</option>
                    <option value='Junior'>Junior</option>
                    <option value='Intermediate'>Intermediate</option>
                    <option value='Experienced'>Experienced</option>
                  </Form.Select>
                </label>
                <label>
                  Date of Birth
                  <input type='date' name='dob' className='edit-teams-input' />
                </label>
                <button type='submit' className='info-button' id='team-edit-create-quizzer-button'>Submit</button>
              </form>
            </div>
            {quizzers.length > 0 &&
              <div className='team-edit-my-quizzers'>
              <h1 className='team-edit-title'>My Quizzers</h1>
              <QuizzersList quizzers={quizzers} setQuizzers={setQuizzers} deleteQuizzer={deleteQuizzer} />
              </div>
            }
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TeamEditModal