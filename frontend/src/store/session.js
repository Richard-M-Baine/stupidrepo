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
  if (token) { // Only attempt to authenticate if a token exists
    try {
      const response = await fetch('/api/auth/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Send token in Authorization header
        }
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data));
      } else {
        console.error("Authentication failed:", response.status);
        localStorage.removeItem('token'); // Clear invalid token
      }
    } catch (error) {
      console.error("Authentication error:", error);
      localStorage.removeItem('token');
    }
  }
};


export const login = (userName, password) => async (dispatch) => {
  const response = await fetch('/api/authenticate/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName, password })
  });

  if (response.ok) {
    const data = await response.json();
    console.log("Login successful:", data); // Debugging log

    localStorage.setItem('token', data.token); // Ensure this works
    dispatch(setUser({
      id: data.id,
      userName: data.userName,
      email: data.email,
      token: data.token
    }));
    return null;
  } else {
    console.log("Login failed:", response.status);
    return response.status < 500 ? await response.json() : ['An error occurred. Please try again.'];
  }
};



export const logout = () => async (dispatch) => {
  console.log("Logging out, removing token...");
  localStorage.removeItem('token');
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
