import React, { useState } from 'react';
import { Modal } from '../../../context/Modal'
import CreateMessageForm from './createMessageForm.js';





function CreateMessageModal() {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      
      <button className='buttonsplash' onClick={() => setShowModal(true)}>Offer Help</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateMessageForm />
        </Modal>
      )}
    </>
  );
}

export default CreateMessageModal;