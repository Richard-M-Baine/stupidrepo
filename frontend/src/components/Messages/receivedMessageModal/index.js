import React, { useState } from 'react';
import { Modal } from '../../../context/Modal'
import ReceivedMessageForm from './receivedMessageForm.js';





function CreateRequestMessageModal() {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      
      <button className='buttonsplash' onClick={() => setShowModal(true)}>Contact Poster</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ReceivedMessageForm />
        </Modal>
      )}
    </>
  );
}

export default CreateRequestMessageModal;