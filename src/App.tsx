import React, { useState } from "react";
import "./App.css";
import UsersService from "./poweUsers"
import { PowerUsers, Action} from "./interfaces";
import SearchBar from "./components/SearchBar"
import UsersList from "./components/UserList"



function reducer (state: PowerUsers[], action: Action): PowerUsers[]{
  
  
  if (action.type === 'initialize') {
    action.dataUsers.forEach(element => element.count = 0);
    return action.dataUsers;

  } else if (action.type === 'filter') {
    return action.dataUsers;

  } else if (action.type === 'update') {
    console.log("update", action.dataId);
      const newState:PowerUsers[] =  state.map((value, index) => {
        if(value.id !== action.dataId){
          value.count += 1;
        }
        return value
      });
    return newState;

  } else if (action.type === 'remove') {
    console.log("remove", action.dataId);
      const newState:PowerUsers[] = state.filter(function(item) {
       return item.id !== action.dataId
      })
    return newState
    
  } else {
    throw new Error(`This action type isn't supported.`)
  }
}


const App: React.FC = () => {

  

  const [UserService] = useState(new UsersService())
  const [searchField, setSearchField] = useState("");
  const [users, dispatch] = React.useReducer(
    reducer,
    []
  )


  function handleSearchChange (event: React.ChangeEvent<HTMLInputElement>) {
    setSearchField(event.target.value);
  }

  function handleUserUpdate (id:number) {
    dispatch({
      'type': "update",
      'dataUsers': [],
      'dataId':id
    })
  }

  function handleUserRemove (id:number) {
    dispatch({
      'type': "remove",
      'dataUsers': [],
      'dataId':id
    })
  }

  React.useEffect(() => {
    async function setAllUsers() {
      let powerUsers :PowerUsers[] = await UserService.getAllUsers();
      dispatch({
        'type': "initialize",
        'dataUsers': powerUsers,
        'dataId':0
      })
    }
    setAllUsers();
  }, [UserService]);

  React.useEffect(() => {
    const id = window.setTimeout(() => {
      async function setSearchedUsers() {
        let powerUsers :PowerUsers[] = await UserService.getUser(searchField);
        dispatch({
          'type': "filter",
          'dataUsers': powerUsers,
          'dataId':0
        })
      }
      setSearchedUsers();
    }, 300)
    return () => {
      window.clearTimeout(id)
    }
  }, [searchField,UserService])


  return (
    <div >
      <SearchBar handleSearchChange = {handleSearchChange}></SearchBar>
      <UsersList powerUsers={users}
                 handleUserUpdate = {handleUserUpdate}
                 handleUserRemove = {handleUserRemove}
      />
    </div>
  );
};

export default App;
