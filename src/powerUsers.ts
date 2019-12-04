import {BasePowerUser} from "./interfaces";

const UsersService = {
    _powerUsers: [...new Array(100)].map((value, index) => {
        return {
            id: index + 1,
            name: "User" + (index + 1)
        };
    }),
    getAllUsers: function (): Promise<BasePowerUser[]> {
        return new Promise(async (resolve, reject) => {
            try {
                return resolve(this._powerUsers);
            } catch (err) {
                return reject(err);
            }
        })
    },
    removeUser: function (id: number): Promise<BasePowerUser[]> {
        return new Promise(async (resolve, reject) => {
            try {
                this._powerUsers = this._powerUsers.filter(function (item) {
                    return item.id !== id
                });
                return resolve(this._powerUsers);
            } catch (err) {
                return reject(err);
            }
        })
    },
    getUser: function (searchField: string): Promise<BasePowerUser[]> {
        return new Promise(async (resolve, reject) => {
            try {
                if (searchField !== "") {
                    const filteredUsers = this._powerUsers.filter(user => {
                        return user.name.toLowerCase().includes(searchField.toLowerCase())
                    });
                    return resolve(filteredUsers);
                } else {
                    return resolve(this._powerUsers);
                }
            } catch (err) {
                return reject(err);
            }
        })
    }
};

export default UsersService




