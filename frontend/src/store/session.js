// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  if (!token) return;

  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Include the token
    }
  });

  if (response.ok) {
    const data = await response.json();
    if (data.errors) return;
    
    dispatch(setUser(data));
  }
};

export const login = (userName, password) => async (dispatch) => {
  const response = await fetch('/api/authenticate/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userName, password })
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem('token', data.token); // Store token

    dispatch(setUser({
      id: data.id,
      userName: data.userName,
      email: data.email,
      token: data.token
    }));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.'];
  }
};


export const logout = () => async (dispatch) => {
  localStorage.removeItem('token'); // Clear token
  dispatch(removeUser());
};



export const signUp = (userName, email, password) => async (dispatch) => {
  const response = await fetch('/api/users/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userName,
      email,
      password,
    }),
  });
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: { ...action.payload } }; // Ensure full user object is stored
    case REMOVE_USER:
      return { user: null };
    default:
      return state;
  }
}
