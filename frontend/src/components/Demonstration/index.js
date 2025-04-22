import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as sessionActions from '../../store/session.js';

export default function DemoUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert('you are going to be logged in as Bilbo Baggins. Use your power wisely');
    const userName = 'loseRings';
    const password = 'password';

    const res = await dispatch(sessionActions.login(userName, password));
    if (res) { // tweak this based on what your thunk returns
      navigate('/mylistings');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button className='buttonsplash' type='submit'>Demo User</button>
    </form>
  );
}
