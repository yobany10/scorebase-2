import Modal from 'react-bootstrap/Modal'

const DeleteConfirmationModal = ({ show, onCancel, onConfirm }) => (
    <Modal show={show} centered onHide={onCancel}>
        <Modal.Header>
            <Modal.Title>Confirm deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this?</Modal.Body>
        <Modal.Footer>
            <button type='button' className='primary-button' onClick={onCancel}>No</button>
            <button type='button' className='primary-button' onClick={onConfirm}>Yes</button>
        </Modal.Footer>
    </Modal>
)

export default DeleteConfirmationModal