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
  try {
    const response = await fetch('/api/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
    },
      credentials: 'include' // Ensures cookies are sent
    });

    if (response.ok) {
      const data = await response.json();
      console.log('i am data in frontend thunk ',data)
      dispatch(setUser(data));
    } else {
      dispatch(removeUser());
    }
  } catch (error) {
    console.error("Session restore error: authenticate in session.js store", error);
    dispatch(removeUser());
  }
};


export const login = (userName, password) => async (dispatch) => {
  try {
    const response = await fetch('/api/authenticate/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Ensure cookies are sent
      body: JSON.stringify({ userName, password })
    });

    if (!response.ok) {
      const errorData = await response.json();
      return [errorData.error || "Login failed"];
    }

    const user = await response.json();
    dispatch(setUser(user));
    return null; // No errors
  } catch (error) {
    return ["Network error, please try again"];
  }
};






export const logout = () => async (dispatch) => {
  await fetch('/api/users/logout', {
    method: 'POST',
    credentials: 'include' // Ensures cookies are sent
  });

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
          return { ...state, user: { ...action.payload } }; // Spread existing state!
      case REMOVE_USER:
          return { ...state, user: null }; // Spread existing state!
      default:
          return state;
  }
}
