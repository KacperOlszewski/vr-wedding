const fs = require('fs');

const controller = {
    getting: false,
    writing: false,
    getUsers: function(success, error) {
        while (!this.getting) {
            this.getting = true;
            fs.readFile('./server/db/users.json', 'utf8', (err, data) => {
                this.getting = false;
                if (err) {
                    error({error: err});
                } else {
                    success(JSON.parse(data));
                }
            });
        }
    },
    updateUsers: function (updatedUser, success, error) {
        while (!this.writing) {
            this.writing = true;
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
                    this.writing = false;
                }
            );
        }
    }
};

module.exports = controller;
