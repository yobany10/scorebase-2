import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { toast } from 'react-toastify';
import './ScoresheetSetupModal.css';

const ScoresheetSetupModal = (props) => {

    const toastOptions = {
        position: 'bottom-right'
    }

    const handleJuniorSetting = () => {
        toast.success('Division set to Juniors', toastOptions)
        props.setDivision('Junior')
    }

    const handleSeniorSetting = () => {
        toast.success('Division set to Senior', toastOptions)
        props.setDivision('Senior')
    }

    const handleDivisionChange = e => {
        e.preventDefault();

        props.setDivision(e.target.value)
    }

    return (
        <Modal show={props.showSetupModal} size='lg' onHide={() => props.setShowSetupModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Quiz Setup</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Choose some options for your current quiz</p>
                <form onSubmit={e => e.preventDefault()}>
                <Form.Select name='division' defaultValue={props.division} onChange={e => handleDivisionChange(e)}>
                    <option value='Junior'>Junior</option>
                    <option value='Senior'>Senior</option>
                </Form.Select>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default ScoresheetSetupModal;