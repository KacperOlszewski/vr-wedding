const controller = require('../controller/controller');

module.exports = function(server, basePath) {
    const usersGoing = basePath + 'users/going';

    server.get(usersGoing , (req, res) => {

        controller.usersGoing(
            (users) => {
                res.send(users);
            },
            (error) => {
                res.send(error);
            }
        );
    });
};