import { createContext, useEffect, useReducer } from 'react' 

const INITIAL_STATE = {
  loading: false,
  user: JSON.parse(localStorage.getItem('user')) || null,
}

export const UserContext = createContext(INITIAL_STATE) 

const UserReducer = (state, action) => {
  switch (action.type) {
    case 'INITIAL':
      return {
        loading: false,
        user: null,
      }
    case 'LOGIN_START':
      return {
        loading: true,
        user: null,
      }
    case 'LOGIN_SUCCESS':
      return {
        loading: false,
        user: action.payload
      }
    default: 
      return state
  }
}

const UserContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE)

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user))
  }, [state.user])

  return <UserContext.Provider value={{
    user: state.user,
    loading: state.loading,
    dispatch,
  }} >{children}</UserContext.Provider>
}
export { UserContextProvider }