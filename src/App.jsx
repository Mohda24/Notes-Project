import React from 'react'
import AppRouter from './Routes/AppRouter'
import { AuthProvider } from './Hooks/usAuth'
import { NotificationProvider } from './Hooks/useNotification'



function App() {
  return (
    <NotificationProvider>
    <AuthProvider>
        <AppRouter />
    </AuthProvider>
    </NotificationProvider>
  )
}
export default App