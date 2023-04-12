import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
import {TbTrash, TbEdit} from 'react-icons/tb'
import {collection, doc, addDoc, updateDoc, serverTimestamp} from 'firebase/firestore'
import {auth, db} from '../Firebase/config'
import './QuizzerItem.css'

const QuizzerItem = ({item, deleteQuizzer}) => {
    const [editMode, setEditMode] = useState(false)

    const toggleEditMode = () => {
        setEditMode(editMode => !editMode)
    }

    const updateQuizzer = async (e) => {
        e.preventDefault()
        let firstName = e.target.firstName.value
        let lastName = e.target.lastName.value
        let division = e.target.division.value
        let dob = e.target.dob.value
        try {
            const quizzerRef = doc(db, 'quizzers', item.id)
            const res = await updateDoc(quizzerRef, {
                firstName: firstName,
                lastName: lastName,
                fullName: `${firstName} ${lastName}`,
                division: division,
                dob: dob,
            })
        } catch (error) {
            console.log(error)
        }
        toggleEditMode()
    }
    
    return (
        <form className='quizzers-list-item' onSubmit={e => updateQuizzer(e)}>
                            {!editMode && 
                                <div className='quizzers-list-item-names'>
                                    <input className='quizzers-list-item-firstname'
                                        required
                                        type='text'
                                        name='firstName'
                                        defaultValue={item.firstName}
                                        disabled
                                    />
                                    <input className='quizzers-list-item-lastname'
                                        required
                                        type='text'
                                        name='lastName'
                                        defaultValue={item.lastName}
                                        disabled
                                    />
                                </div>
                            }
                            {editMode && 
                                <div className='quizzers-list-item-names'>
                                    <input className='quizzers-list-item-firstname'
                                        required
                                        type='text'
                                        name='firstName'
                                        defaultValue={item.firstName}
                                        onChange={(e) => {
                                            const value = e.target.value
                                        }}
                                    />
                                    <input className='quizzers-list-item-lastname'
                                        required
                                        type='text'
                                        name='lastName'
                                        defaultValue={item.lastName}
                                        onChange={(e) => {
                                            const value = e.target.value
                                        }}
                                    />
                                </div>
                            }
                            <Form.Select name='division' defaultValue={item.division} disabled={editMode ? false : true}>
                                <option value='Beginner'>Beginner</option>
                                <option value='Junior'>Junior</option>
                                <option value='Intermediate'>Intermediate</option>
                                <option value='Experienced'>Experienced</option>
                            </Form.Select>
                            {!editMode && <input type='date' name='dob' defaultValue={item.dob} disabled />}
                            {editMode && <input type='date' name='dob' defaultValue={item.dob} />}
                            {/* <p className='quizzers-list-item-dob'>DOB: {item.dob == '' ? 'No data' : item.dob}</p> */}
                            <div className='quizzers-list-item-actions'>
                                {!editMode && <TbEdit className='quizzers-list-item-actions-edit' onClick={toggleEditMode} />}
                                {editMode && <button className='primary-button' id='quizzer-list-item-actions-submit' type='submit'>submit changes</button>}
                                {!editMode && <TbTrash className='quizzers-list-item-actions-delete' onClick={() => deleteQuizzer(item.id)} />}
                                {editMode && <button className='primary-button' id='quizzer-list-item-actions-cancel' type='button' onClick={() => {
                                    toggleEditMode()
                                }}>Cancel</button>}
                            </div>
                        </form>
    )
}

export default QuizzerItem