// ---------------- Constants ----------------
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

// ---------------- Action Creators ----------------
const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
});

// ---------------- Initial State ----------------
const initialState = { user: null };

// ---------------- Thunks ----------------

export const authenticate = () => async (dispatch) => {
  try {
    const res = await fetch('/api/users/me', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(setUser(data || null));
    } else {
      dispatch(removeUser());
    }
  } catch (err) {
    console.error("Authenticate error:", err);
    dispatch(removeUser());
  }
};

export const login = (userName, password) => async (dispatch) => {
  try {
    const res = await fetch('/api/authenticate/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ userName, password })
    });

    if (!res.ok) {
      const errorData = await res.json();
      return [errorData?.error || "Login failed"];
    }

    const user = await res.json();
    dispatch(setUser(user));
    return null;
  } catch (err) {
    console.error("Login error:", err);
    return ["Network error, please try again"];
  }
};

export const logout = () => async (dispatch) => {
  try {
    await fetch('/api/users/logout', {
      method: 'POST',
      credentials: 'include'
    });
  } catch (err) {
    console.error("Logout error:", err);
  } finally {
    dispatch(removeUser());
  }
};

export const signUp = (userName, email, password, latitude, longitude) => async (dispatch) => {
  try {
    const res = await fetch('/api/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', 
      body: JSON.stringify({ userName, email, password, latitude, longitude }),
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(setUser(data));
      return null;
    } else if (res.status < 500) {
      const data = await res.json();
      return data?.errors || ['Something went wrong.'];
    } else {
      return ['An error occurred in the bloody sign up one. Please try again.'];
    }
  } catch (err) {
    console.error("Signup error:", err);
    return ['A network error occurred. Please try again.'];
  }
};


// ---------------- Reducerville  ----------------
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload || null }; // <- handles backend sending null
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
}
