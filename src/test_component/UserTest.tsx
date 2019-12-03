import React from 'react'
import {UserTestInterface} from "../interfaces"


const User: React.FC<UserTestInterface>  = (props) =>{
    React.useEffect(() => props.handleUpdate());
    return(
        <div>
            <div onClick = {() => props.handleUserUpdate(props.user.id)}>
                {props.user.name} 
                {props.user.count === 0 ?
                " " :
                ` - ${props.user.count}`
                }
            </div>
            <button onClick = {() => props.handleUserRemove(props.user.id)}>
                Remove User
            </button>
        </div>
    )
}

export default User;