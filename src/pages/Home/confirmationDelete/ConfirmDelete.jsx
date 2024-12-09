import React from 'react'
import { useNotes } from '../../../Hooks/useNotes';

function ConfirmDelete() {
    const {setConfirmDelete,deleteId,deleteNote}=useNotes();

    const handleDelete=()=>{
        deleteNote(deleteId);
        setConfirmDelete(false);
    }
    return (
        <div className='p-8 bg-[#eee5c4] shadow-2xl w-[400px] rounded-lg'>
            <h3 className='text-xl font-semibold text-gray-800'>Confirmation</h3>
            <p className='text-gray-600 mt-2'>Are you sure you want to delete this note?</p>
            <div className='flex justify-end gap-4 mt-6'>
                <button
                onClick={handleDelete}
                className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-300'>Delete</button>
                <button 
                onClick={()=>setConfirmDelete(false)}
                className='bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition duration-300'>Cancel</button>
            </div>
        </div>
    )
}

export default ConfirmDelete