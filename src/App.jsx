import React from 'react'
import AppRouter from './Routes/AppRouter'
import {AuthProvider} from './Hooks/usAuth'



function App() {
  return(
    <AuthProvider>
        <AppRouter/>
    </AuthProvider>
  )
}
export default App