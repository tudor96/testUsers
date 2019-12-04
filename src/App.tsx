import React, {useState} from "react";
import "./App.css";
import UsersService from "./powerUsers"
import {PowerUsers, Action} from "./interfaces";
import SearchBar from "./components/SearchBar"
import UsersList from "./components/UserList"


function reducer(state: PowerUsers[], action: Action): PowerUsers[] {


    if (action.type === 'initialize') {
        // action.dataUsers.forEach(element => element.count = 0);
        return action.dataUsers;

    } else if (action.type === 'filter') {
        return action.dataUsers;

    } else if (action.type === 'update') {
        console.log("update", action.dataId);
        const newState: PowerUsers[] = state.map((value, index) => {
            if (value.id !== action.dataId) {
                value.count += 1;
            }
            return value
        });
        return newState;

    } else if (action.type === 'remove') {
        console.log("remove", action.dataId);
        const newState: PowerUsers[] = state.filter(function (item) {
            return item.id !== action.dataId
        });
        return newState

    } else {
        throw new Error(`This action type isn't supported.`)
    }
}


const App: React.FC = () => {


    const [searchField, setSearchField] = useState("");
    const [users, dispatch] = React.useReducer(
        reducer,
        []
    );


    function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchField(event.target.value);
    }

    function handleUserUpdate(id: number) {
        dispatch({
            'type': "update",
            'dataUsers': [],
            'dataId': id
        })
    }

    function handleUserRemove(id: number) {
        dispatch({
            'type': "remove",
            'dataUsers': [],
            'dataId': id
        });
        UsersService.removeUser(id);
    }

    React.useEffect(() => {
        async function setAllUsers() {
            const powerUsers = await UsersService.getAllUsers();
            dispatch({
                type: "initialize",
                dataUsers: powerUsers.map(pUser => ({...pUser, count: 0})),
                dataId: 0
            })
        }

        setAllUsers();
    }, []);

    React.useEffect(() => {
        const id = window.setTimeout(() => {
            async function setSearchedUsers() {
                const powerUsers = await UsersService.getUser(searchField);
                dispatch({
                    type: "filter",
                    dataUsers: powerUsers.map(pUser => {
                        let countValue = 0;
                        const foundUser = users.find(user => user.id === pUser.id);
                        if (foundUser) {
                            countValue = foundUser.count
                        }
                        // TODO: with TS 3.7 the above 5 lines can be optimized but requires babel configuration...
                        return ({
                            ...pUser,
                            count: countValue
                        })
                    }),
                    dataId: 0
                })
            }

            setSearchedUsers();
        }, 300);
        return () => {
            window.clearTimeout(id)
        }
    }, [searchField]);


    return (
        <div>
            <SearchBar handleSearchChange={handleSearchChange}/>
            <UsersList powerUsers={users}
                       handleUserUpdate={handleUserUpdate}
                       handleUserRemove={handleUserRemove}
            />
        </div>
    );
};

export default App;
