import React from 'react'
import {UserInterface} from "../interfaces"


const User: React.FC<UserInterface>  = (props) =>{
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