import './App.css'
import AdminRouter from './Routing/AdminRouter'
import { createContext, useReducer } from 'react'
export const GlobalContext = createContext({})

const init = {
  loginRole: localStorage.getItem('status') === 'null' ? '' : localStorage.getItem('status'),
}

function App() {
  const [state, dispatch] = useReducer(reducer, init)
  console.log('In App File')
  function reducer(state, action) {
    switch (action.type) {
      case 'status':
        return action.payload
      default:
        console.log(localStorage.getItem('status'))
        return state
    }
  }

  return (
    <>
      <GlobalContext.Provider value={{ state, dispatch }}>
        <AdminRouter />
      </GlobalContext.Provider>
    </>
  )
}

export default App
