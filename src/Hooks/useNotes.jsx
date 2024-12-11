import React, { useContext,createContext,useEffect,useState } from "react";
import axios from "axios";
import { useAuth } from "./usAuth";
import { useNotification } from "./useNotification";

const NotesContext=createContext();

export const NotesProvider=({children})=>{
    const {setIsAuthenticated}=useAuth();
    const [notes,setNotes]=useState([]);
    const [filterNotes,setFilterNotes]=useState([]);
    const [allNotes,setAllNotes]=useState([]);
    const [isFilter,setFilter]=useState(false);
    const [loading,setLoading]=useState(true);
    const [users,setUsers]=useState([]);
    const [noteById,setNoteById]=useState({
        note:{},
        loading:true
    });
    const [isAddmode,setIsAddmode]=useState(true);
    const [showManageNote, setShowManageNote] = React.useState(null);
    // for call fetchNote multi time
    const [notesChanged, setNotesChanged] = useState(false);
    // for Delete
    const [deletedNote, setDeletedNote] = useState({ confirm: false, id: null });
    // notification
    const {setNotification}=useNotification();



    const Api_url='https://notes.devlop.tech/api';
    const token=localStorage.getItem('token');
// filter notes by owner
    const filerNotesByOwner=(notes)=>{
        const filtered=notes.filter((note)=>note.is_owner);
        setFilterNotes(filtered);
    }
    // fetch notes
    useEffect(()=>{
        const fetchNotes = async () => {
            if(!token){
                setIsAuthenticated(false);
            }
            try{
                setLoading(true);
                const response = await axios.get(Api_url+'/notes',{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                });
                setNotes(response.data);
                setAllNotes(response.data);
                filerNotesByOwner(response.data);
            }catch(error){
                if (error.response?.status === 401) {
                    localStorage.removeItem('token');
                    setIsAuthenticated(false);
                } else {
                    console.error("Unexpected error:", error);
                }
            }finally{
                setLoading(false);
            }
        };

        fetchNotes();
    },[notesChanged])

    useEffect(()=>{
        setNotes(isFilter ? filterNotes : allNotes);
    },[isFilter,allNotes,filterNotes])

    // add note
    const addNote=async(note)=>{
        try{
            if(!token){
                setIsAuthenticated(false);
            }
            
            const response=await axios.post(Api_url+'/notes',note,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            if(response.status===201){
                setNotesChanged(!notesChanged);
                setNotification((prev) => ({ ...prev, show: true, type: "success", message: "Note added successfully" }));
                
            }
        }catch(error){
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                setIsAuthenticated(false);
            } else {
                console.error("Unexpected error:", error);
            }
        }

    }
    // update note
    const updateNote=async(note)=>{
        try{
            if(!token){
                setIsAuthenticated(false);
            }
            const response=await axios.put(Api_url+`/notes/${note.id}`,note,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            if(response.status===200){
                setNotesChanged(!notesChanged);
                setNotification((prev) => ({ ...prev, show: true, type: "success", message: "Note updated successfully" }));
            }
        }catch(error){
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                setIsAuthenticated(false);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    }
    // delete note
    const deleteNote=async(id)=>{
        try{
            if(!token){
                setIsAuthenticated(false);
            }
            
            const response=await axios.delete(Api_url+`/notes/${id}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            
            if(response.status===200){
                setNotesChanged(!notesChanged);
                setNotification((prev) => ({ ...prev, show: true, type: "success", message: "Note deleted successfully" }));
            }
        }catch(error){
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                setIsAuthenticated(false);
            } else {
                console.error("Unexpected error:", error);
            }
            
        }finally{
            
        }
    }
    // get note by id
    const getNoteById=async (id)=>{
        try{
            if(!token){
                setIsAuthenticated(false);
            }
            setNoteById({
                note:{},
                loading:true
            })
            const response=await axios.get(Api_url+`/notes/${id}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            
            if(response.status===200){
                setNoteById((prev) => ({ ...prev, note: response.data }));
                
                
                
                
                
            }

    }catch(error){
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
        } else {
            console.error("Unexpected error:", error);
        }
    }finally{
        setNoteById((prev) => ({ ...prev, loading: false }));
    }
}




useEffect(()=>{
    // get all users
const getUsers=async()=>{
    try{
        if(!token){
            setIsAuthenticated(false);
        }
        const response=await axios.get(Api_url+'/users',{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        if(response.status===200){
            setUsers([...response.data]);
        }
    
    }catch(error){
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
        } else {
            console.error("Unexpected error:", error);
        }
    }
}
getUsers();

},[])




    return (
        <NotesContext.Provider value={{notes,isFilter,setFilter,loading,setLoading,users,getNoteById,isAddmode,setIsAddmode,showManageNote,setShowManageNote,noteById,addNote,updateNote,deletedNote, setDeletedNote,deleteNote}}>
            {children}
        </NotesContext.Provider>
    )
}

export const useNotes=()=>{
    return useContext(NotesContext);
}