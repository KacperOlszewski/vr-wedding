const controller = require('../controller/controller');

module.exports = function(server, basePath) {
    const usersGoing = basePath + 'users/going';
    const userSleep = basePath + 'user/sleep';

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

    server.post(userSleep , (req, res) => {
        const data = req.body;

        controller.userSleep(
            data,
            () => {
                res.send({success: true});
            },
            () => {
                res.send({success: false});
            }
        );
    });
};