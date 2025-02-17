import React, { useState } from 'react';
import { Modal } from '../../../context/Modal'
import SignUpForm from './SignupForm.js';

import './signupform.css'



function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);
  console.log(showModal)
  return (
    <>
      
      <button className='buttonsplash' onClick={() => setShowModal(true)}>Sign Up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignUpForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;