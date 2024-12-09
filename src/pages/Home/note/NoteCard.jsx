import React,{useRef,useState} from 'react'
import { getDate } from "../../../helpers/helpersFunction"
import useOnScreen from "../../../Hooks/useOnScreen"
import { useNotes } from '../../../Hooks/useNotes'

function NoteCard({ id, title, content, date, is_owner, shared_with }) {
    const {getNoteById,setIsAddmode,setShowManageNote,setDeleteId,setConfirmDelete}=useNotes();
    const noteRef = useRef(null)
    const isVisible = useOnScreen(noteRef, { rootMargin: "0px", threshold: 1 })
//  handle update note
    const handleUpdateNote = (id) => {
        setIsAddmode(false)
        setShowManageNote(true)
        getNoteById(id)
    }
//  handle delete note
    const handleDeleteNote = (id) => {
        setDeleteId(id)
        setConfirmDelete(true)
    }

    return (
        <div
        onClick={()=>handleUpdateNote(id)}
        ref={noteRef}
        style={{animationDelay: `${Math.random() * 0.5}s`}}
        className={`noteCard group relative cursor-pointer inline-block w-full ${is_owner ? 'bg-secondaryCard-bg text-black after:border-b-[#ddcb89]' : 'bg-primaryCard-bg text-white after:border-b-black '}   p-6 rounded-s-md rounded-t-md relative before:content-[""] before:absolute before:right-0 before:bottom-0 before:w-10 before:h-10 before:bg-bg-color before:translate-x-1/2 before:translate-y-1/2 before:rotate-45 mb-5 after:absolute after:content-[""] after:right-0 after:bottom-0 after:border-[20px] after:border-transparent  after:rotate-[-45deg] after:translate-x-[-21%] after:translate-y-[-20%] opacity-0 translate-y-3 odd:translate-y-[-12px] ${isVisible && "animate-fadeIn" }`}>
            <button
            onClick={(e)=>{e.stopPropagation();handleDeleteNote(id)}}
            className='absolute text-[18px] top-4 right-0 opacity-0 group-hover:right-2 group-hover:opacity-100 duration-300 hover:scale-90 '>✕</button>
            <span className='date mb-1 block text-xs opacity-60'>{getDate(date)}</span>
            <h2 className='Title text-3xl font-semibold  line-clamp-2 mb-5 leading-normal'>{title}</h2>
            <div className={`Content line-clamp-3 py-4 border-t ${is_owner ? 'border-[rgba(0,0,2,0.1)]' : 'border-[rgba(255,255,255,0.1)]'}`} dangerouslySetInnerHTML={{ __html: content }}></div>

            {shared_with.length > 0 &&
                <div className='Owner mt-5 flex'> 
                    {shared_with.map((user) => {
                        return(
                            <div key={user.id} className="avatar group/avatar first:ms-0 border-[3px] first:border-none border-secondaryCard-bg ms-[-10px]  relative w-9 h-9 rounded-full bg-black text-white font-bold text-sm flex items-center justify-center cursor-pointer select-none">
                                <span className="Tooltip text-xs absolute invisible opacity-0 duration-300 ease-in transition-all py-2 px-3  bg-black text-white rounded-full font-semibold whitespace-nowrap top-[-40px]  after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:rotate-45 after:bg-inherit after:w-2 after:h-2 after:translate-x-[-50%] after:translate-y-1/2 group-hover/avatar:visible group-hover/avatar:opacity-100 select-none">{`${user.first_name} ${user.last_name}`}
                                </span>
                                {`${user.first_name[0]}${user.last_name[0]}`}
                            </div>)
                    })}
                </div>
            }
        </div>
    )
}

export default NoteCard