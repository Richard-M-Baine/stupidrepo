import React, { useState } from 'react';
import { Modal } from '../../../context/Modal'
import LoginForm from './LoginForm.js';

import './loginmodal.css'



function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      
      <button className='buttonsplash' onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm  />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;