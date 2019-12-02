function UsersService() {
    this._powerUsers = [...new Array(100)].map((value, index) => {
        return {
            id: index + 1,
            name: "User" + (index + 1)
        };
    });
}

UsersService.prototype.getAllUsers = function() {
    return new Promise(async(resolve, reject) => {
        try {
            return resolve(this._powerUsers);
        } catch (err) {
            return reject(err);
        }
    });
}

UsersService.prototype.removeUser = function(id) {
    return new Promise(async(resolve, reject) => {
        try {
            this._powerUsers = this._powerUsers.filter(function(item) {
                return item.id !== id
            })
            return resolve(this._powerUsers);
        } catch (err) {
            return reject(err);
        }
    });
}

UsersService.prototype.getUser = function(searchField) {
    return new Promise(async(resolve, reject) => {
        try {
            if (searchField !== "") {
                const fileredUsers = this._powerUsers.filter(user => {
                    return user.name.toLowerCase().includes(searchField.toLowerCase())
                })
                return resolve(fileredUsers);
            } else {
                return resolve(this._powerUsers);
            }
        } catch (err) {
            return reject(err);
        }
    });
}



module.exports = UsersService;