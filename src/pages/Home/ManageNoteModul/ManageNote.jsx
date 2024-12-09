import React, { useEffect } from 'react'
import SharedUser from './sheredNotes/SharedUser'
import MediumNoteEditor from './MediumEditor/MediumEditor'
import { useNotes } from '../../../Hooks/useNotes';
import Loading from '../../../Animation/loading';



function ManageNote() {
    const { isAddmode, noteById,showManageNote,setShowManageNote,addNote,updateNote } = useNotes();

    const [titleNote, setTitle] = React.useState("Note title");
    const [content, setContent] = React.useState("Note default content");
    const [sharedUsers, setSharedUsers] = React.useState([]);

    // handle Save Note
    const handleSaveNote = () => {
        if (isAddmode) {
            addNote({
                title: titleNote,
                content: content,
                shared_with: sharedUsers.map((user) => user.id)
            });
        } else {
            updateNote({
                id: noteById.note.id,
                title: titleNote,
                content: content,
                shared_with: sharedUsers.map((user) => user.id)
            })
        }
        setShowManageNote(false);
    }
    // handle close note
    const handleCloseNote = () => {
        setShowManageNote(false);
    }
    useEffect(() => {
        if (!isAddmode) {
            setTitle(noteById.note.title);
            setContent(noteById.note.content);
            setSharedUsers(noteById.note.shared_with);
        }else{
            setTitle("Note title");
            setContent("Note default content");
            setSharedUsers([]);
        }

    }, [noteById, isAddmode]);
    return (

        <div className={`ModulNotes w-[400px] h-screen bg-primary-color fixed "right-[-100%] invisible opacity-0  top-0 ${showManageNote && "animate-show"} ${showManageNote===false && "animate-offShow"}   shadow-md p-10 flex flex-col`}>
            {(!isAddmode && noteById.loading) ? <div className='absolute w-full h-full left-0 top-0 flex items-center justify-center'>
                <Loading color={"#eee5c4"} style={{ width: "60px" }} />
            </div>
                :

                <>
                    <h2 
                    onBlur={(e) => setTitle(e.target.textContent)}
                    className='text-3xl  mb-5 outline-none capitalize ' contentEditable={true} spellCheck={false} dangerouslySetInnerHTML={{ __html: titleNote }} ></h2>
                    <SharedUser sharedUsers={sharedUsers} setSharedUsers={setSharedUsers} />
                    <div className="Separate w-full h-[1px] bg-secondaryCard-bg opacity-15 mb-5" />
                    <div className="content flex-1">
                        <MediumNoteEditor content={ content } onChange={setContent}/>
                    
                    </div>
                    <div className="btns flex items-center gap-5">
                        <button 
                        onClick={handleCloseNote}
                        className='bg-primaryCard-bg text-white py-3 px-10 rounded-full w-full text-lg duration-300 hover:opacity-70 transition-opacity ease-in shadow-md'>Close</button>
                        <button
                            onClick={handleSaveNote}

                            className='bg-secondaryCard-bg  py-3 px-10 rounded-full w-full text-black text-lg duration-300 hover:opacity-70 transition-opacity ease-in shadow-md'>Save</button>
                    </div></>

            }


        </div>

    )
}

export default ManageNote