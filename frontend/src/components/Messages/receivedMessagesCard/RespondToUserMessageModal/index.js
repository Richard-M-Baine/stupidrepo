import React, { useState } from 'react';
import { Modal } from '../../../../context/Modal'
import RespondToUserMessageForm from './RespondToUserMessageForm.js';





function RespondToUserMessageModal({receivedMessage}) {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      
      <button className='sentMessageCardDelete' onClick={() => setShowModal(true)}>Respond</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <RespondToUserMessageForm receivedMessage={receivedMessage} key={receivedMessage?.id} />
        </Modal>
      )}
    </>
  );
}

export default RespondToUserMessageModal;