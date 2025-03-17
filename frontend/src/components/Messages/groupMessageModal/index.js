import React, { useState } from 'react';
import { Modal } from '../../../context/Modal'
import GroupMessageForm from './groupMessageForm.js';





function CreateGroupMessageModal() {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      
      <button className='buttonsplash' onClick={() => setShowModal(true)}>Contact Poster</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <GroupMessageForm />
        </Modal>
      )}
    </>
  );
}

export default CreateGroupMessageModal;