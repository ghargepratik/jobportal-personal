import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const ThankYou = ({ showModal, setShowModal }) => {
  const handleClose = () => setShowModal(false)

  return (
    <div>
      <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}></div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ThankYou
