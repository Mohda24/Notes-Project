import React from 'react'
import { useAuth } from '../../../Hooks/usAuth'
import { useNotes } from '../../../Hooks/useNotes'

function Header() {
    const { logout } = useAuth();
    const { isFilter, setFilter,setShowManageNote,setIsAddmode} = useNotes();
    const userName = localStorage.getItem('userName');

    const handleAddNote = () => {
        setIsAddmode(true);
        setShowManageNote(true);
    }
    return (
        <header className='flex items-center justify-between mb-8'>
            <div className="title flex items-center gap-5">
                <h1 className='text-5xl capitalize'>Hello {userName.toLowerCase()} 👋</h1>
                <div className="filter flex items-center gap-5">
                    <span>My notes only</span>
                    <button
                        onClick={() => setFilter(!isFilter)}
                        className={`filterBtn w-14 h-8 relative duration-300 before:duration-300 before:ease-linear ease-linear before:transition-all transition-all  rounded-full before:absolute before:w-6 before:h-6  before:content-[""] before:rounded-full  ${isFilter ? "before:left-7 before:bg-white bg-secondaryCard-bg" : "bg-primaryCard-bg before:left-1 before:bg-secondaryCard-bg "} before:top-1 select-none shadow-sm`}></button>
                </div>
            </div>
            <div className="btns flex items-center gap-5">
            <button 
            onClick={handleAddNote}
            className='px-8 py-3 rounded-full select-none bg-secondaryCard-bg text-black hover:opacity-60 duration-300 transition-opacity'>
                + New note
            </button>
            <button
                onClick={() => logout()}
                className='px-8 py-3 bg-primaryCard-bg rounded-full capitalize select-none hover:bg-secondaryCard-bg duration-300 hover:opacity-60 transition-all shadow-sm'>logout
            </button>

            </div>
            
        </header>
    )
}

export default Header