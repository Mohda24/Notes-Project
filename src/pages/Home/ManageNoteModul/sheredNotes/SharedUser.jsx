import React, { useEffect } from 'react'
import { useNotes } from '../../../../Hooks/useNotes'

function SharedUser({sharedUsers=[],setSharedUsers}) {
    const { users } = useNotes();
    const [Allusers, setAllUsers] = React.useState([]);
    const [showDropdown, setShowDropdown] = React.useState(false);
// function Handle Show Dropdown
    const handleShowDropdown = (e) => {
        if(!e.target.getAttribute('role')){
            setShowDropdown(!showDropdown);
        }

    }
// function to add shared user
    const addSharedUser = (user) => {
        setSharedUsers((prev) => [...prev, user]);
        setAllUsers((prev) => prev.filter((u) => u.id !== user.id));
    }
// function to remove shared user
    const removeSharedUser = (user) => {
        setSharedUsers((prev) => prev.filter((u) => u.id !== user.id));
        setAllUsers((prev) => [...prev, user]);
    }

    useEffect(() => {
        if (users.length > 0) {
            if(sharedUsers.length>0){
                const usersId=sharedUsers.map((user)=>user.id);
                console.log(usersId);
                
                const usersfilter=users.filter((user)=>!usersId.includes(user.id));
                console.log(usersfilter);
                
                setAllUsers(usersfilter);
            }else{
                setAllUsers(users);
            }
            
        }
    }, [users])
    return (
        <div

            onClick={(e) => handleShowDropdown(e)}
            className='p-3 bg-primaryCard-bg rounded-md mb-6 relative'>

            <div className='label flex items-center justify-between select-none'>
                {/* if not shared notes */}
                {sharedUsers.length === 0 && <span className='text-sm capitalize opacity-50'>Share This note</span>}
                {/* if shered notes */}
                {sharedUsers.length > 0 &&
                    <div className='flex items-center justify-start gap-1 flex-wrap   flex-1 '>
                        {sharedUsers.map((user) => {
                            return <span key={user.id} className=' capitalize text-xs px-2  bg-[#635e4b] rounded-md flex items-center gap-2'>{user.first_name.toLowerCase() + " " + user.last_name.toLowerCase()}
                                <button 
                                onClick={()=>removeSharedUser(user)}
                                role='removeNote'
                                
                                className='group removeNote hover:bg-secondaryCard-bg py-2 px-1 rounded-sm h-full cursor-pointer duration-300'>
                                    <svg
                                    role='removeNote'
                                    className='fill-current removeNote group-hover:fill-black duration-300' height="14" width="14" viewBox="0 0 20 20" aria-hidden="true" focusable="false" ><path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path></svg>
                                </button>

                            </span>
                        })}

                    </div>}
                <span className='block w-[1px] h-4 bg-white ms-auto me-2' />
                <svg className='hover:opacity-50 duration-300 ease-in css-8mmkcg' fill={"#FFFFFF"} height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
            </div>
            {showDropdown &&
                <div className='absolute max-h-[320px] overflow-auto bg-[#635e4b]  flex flex-col items-start gap-1 w-full left-0 top-[calc(100%+10px)]  z-50 select-none'>
                    {Allusers.length > 0 && Allusers.map((user) => {
                        return <span onClick={() => addSharedUser(user)} key={user.id} className='block w-full capitalize leading-normal hover:bg-primaryCard-bg cursor-pointer px-4 py-2'>{user.first_name.toLowerCase() + " " + user.last_name.toLowerCase()}</span>
                    })}

                </div>
            }

        </div>
    )
}

export default SharedUser