import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import {TbTrash, TbEdit} from 'react-icons/tb'
import './QuizzerItem.css'
import { updateQuizzer as updateStoredQuizzer } from '../storage/scorebaseDb'
import DeleteConfirmationModal from './DeleteConfirmationModal'

const QuizzerItem = ({item, deleteQuizzer, onQuizzerUpdated}) => {
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const getAge = (dob) => {
        if (!dob) {
            return 'Not provided'
        }

        const [year, month, day] = dob.split('-').map(Number)
        const birthDate = new Date(year, month - 1, day)

        if (Number.isNaN(birthDate.getTime())) {
            return 'Not provided'
        }

        const today = new Date()
        let age = today.getFullYear() - birthDate.getFullYear()
        const hasHadBirthday = today.getMonth() > birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate())

        if (!hasHadBirthday) {
            age -= 1
        }

        return age >= 0 ? age : 'Not provided'
    }

    const updateQuizzer = async (e) => {
        e.preventDefault()
        const firstName = e.target.firstName.value
        const lastName = e.target.lastName.value
        const division = e.target.division.value
        const dob = e.target.dob.value
        try {
            await updateStoredQuizzer(item.id, {
                firstName,
                lastName,
                fullName: `${firstName} ${lastName}`,
                division,
                dob
            })
            await onQuizzerUpdated()
            setShowEditModal(false)
        } catch (error) {
            console.log(error)
        }
    }

    const confirmDelete = async () => {
        await deleteQuizzer(item.id)
    }
    
    return (
        <>
            <article className='quizzers-list-item' onClick={() => setShowEditModal(true)}>
                <p className='quizzers-list-item-name'>{item.firstName} {item.lastName}</p>
                <dl className='quizzers-list-item-details'>
                    <div>
                        <dt>Division</dt>
                        <dd>{item.division}</dd>
                    </div>
                    <div>
                        <dt>Birthdate</dt>
                        <dd>{item.dob || 'Not provided'}</dd>
                    </div>
                    <div>
                        <dt>Age</dt>
                        <dd>{getAge(item.dob)}</dd>
                    </div>
                </dl>
                <div className='quizzers-list-item-actions' onClick={(e) => e.stopPropagation()}>
                    <button type='button' className='quizzers-list-item-actions-edit' aria-label={`Edit ${item.fullName}`} title={`Edit ${item.fullName}`} onClick={() => setShowEditModal(true)}>
                        <TbEdit />
                    </button>
                    <button type='button' className='quizzers-list-item-actions-delete' aria-label={`Delete ${item.fullName}`} title={`Delete ${item.fullName}`} onClick={() => setShowDeleteModal(true)}>
                        <TbTrash />
                    </button>
                </div>
            </article>
            <Modal show={showEditModal} centered onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Quizzer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='quizzer-edit-form' onSubmit={updateQuizzer}>
                        <label>First Name *<input required type='text' name='firstName' defaultValue={item.firstName} /></label>
                        <label>Last Name *<input required type='text' name='lastName' defaultValue={item.lastName} /></label>
                        <label>Division *
                            <Form.Select name='division' defaultValue={item.division}>
                                <option value='Beginner'>Beginner</option>
                                <option value='Junior'>Junior</option>
                                <option value='Intermediate'>Intermediate</option>
                                <option value='Experienced'>Experienced</option>
                            </Form.Select>
                        </label>
                        <label>Birthdate<input type='date' name='dob' defaultValue={item.dob} /></label>
                        <div className='quizzer-edit-form-actions'>
                            <button type='submit' className='primary-button'>Save changes</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            <DeleteConfirmationModal
                show={showDeleteModal}
                onCancel={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
            />
        </>
    )
}

export default QuizzerItem