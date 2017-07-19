const fs = require('fs');

const controller = {
    getting: false,
    writing: false,
    goingProgress: false,
    getUsers: function(success, error) {
        fs.readFile('./server/db/users.json', 'utf8', (err, data) => {
            this.getting = false;
            if (err) {
                error({error: err});
            } else {
                success(JSON.parse(data));
            }
        });
    },
    updateUsers: function (updatedUser, success, error) {
        this.getUsers(
            (users) => {
                users[updatedUser.token].going = updatedUser.going;
                fs.writeFile('./server/db/users.json', JSON.stringify(users), (err) => {
                    this.writing = false;
                    if (err) {
                        error();
                    } else {
                        success();
                    }
                });
            },
            () => {
                error();
            }
        );
    },
    usersGoing: function(success, error) {
        var start = new Date().getTime();

        this.getUsers(
            (users) => {
                const goingUsers = [];

                for (const k in users) {

                    if (users.hasOwnProperty(k)) {
                        const currentUser = users[k];

                        if (currentUser.going == true) {
                            delete currentUser.token;

                            goingUsers.push(currentUser)
                        }
                    }
                }
                success(goingUsers);
            },
            () => {
                error();
            }
        );
    },
};

module.exports = controller;
