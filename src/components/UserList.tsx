import React from 'react';
import {UserListInterface} from "../interfaces"
import User from "./User"

const UserList: React.FC<UserListInterface> = (props) => {
    return (
      <div className="todo-list">
        <ul>
          {props.powerUsers.map((user, index) => (
              <li key = {user.id}>
            {console.log("USER")}

              <User
                user={user}
                handleUserUpdate={props.handleUserUpdate}
                handleUserRemove={props.handleUserRemove}
              />
               </li>
          ))}
        </ul>
      </div>
    )
  }

  export default UserList;
  