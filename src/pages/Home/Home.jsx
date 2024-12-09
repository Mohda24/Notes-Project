import React from 'react'
import Header from './Header/Header'
import NoteCard from './note/NoteCard'
import { useNotes } from '../../Hooks/useNotes'
import Loading from '../../Animation/loading';
import ManageNote from './ManageNoteModul/ManageNote';
import ConfirmDelete from './confirmationDelete/ConfirmDelete';



function Home() {
    const { notes, isFilter, loading, confirmDelete } = useNotes();
    return (
        <div className='py-10 px-4'>
            <Header />
            <div className="Separate w-full h-[1px] bg-secondaryCard-bg opacity-15 mb-10" />
            <div className='notes columns-1 md:columns-3 lg:columns-4 gap-5'>
                <>
                    {loading
                        ? <div className='absolute w-full h-full left-0 top-0 flex items-center justify-center'>
                            {<Loading color={"#eee5c4"} style={{ width: "60px" }} />}
                        </div>
                        : notes.map((note) => {
                            return <NoteCard
                                key={`${note.id}-${isFilter}`} id={note.id} title={note.title} content={note.content} date={note.date} is_owner={note.is_owner} shared_with={note.shared_with} />
                        })
                    }
                </>
            </div>
            <ManageNote />
            {confirmDelete &&
                <div className='fixed w-full h-full left-0 top-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center'>
                    <ConfirmDelete />
                </div>
            }


        </div>
    )
}

export default Home