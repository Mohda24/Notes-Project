import React from 'react'
import Home from './Home'
import {NotesProvider} from '../../Hooks/useNotes'

function HomePage() {
    return (
        <NotesProvider>
        <Home/>
        </NotesProvider>
    )
}

export default HomePage