const fs = require('fs');
const defaultUsers = require('../db/users.json');
const controller = require('../controller/controller');
const hack = 'hack';
let progress = false;

module.exports = function(server, basePath) {
    const session = {};
    const authEndpoint = basePath + 'authorize';
    const getUserEndpoint = basePath + 'user/:token';
    const saveUser = basePath + 'user/going';

    server.post(authEndpoint , (req, res) => {
        const data = req.body;
        const authorizedUser = Boolean(defaultUsers[data.pass]);

        if (authorizedUser) {
            const ip = getIp(req);
            session[ip] = data.pass;

            res.send({
                bundle: './index.bundle.js',
                validToken: data.pass
            });
        } else {
            res.status(401);
            res.send('None shall pass');
        }
    });

    server.get(getUserEndpoint , (req, res) => {
        const token = req.params.token;

        controller.getUsers(
            (users) => {
                const ip = getIp(req);
                const authorizedUser = users[session[ip]];

                if (authorizedUser) {
                    res.send(authorizedUser);
                } else {
                    res.send(users[hack]);
                }

                delete session[ip];
            },
            (error) => {
                res.send(defaultUsers[hack]);
            }
        );
    });

    server.post(saveUser , (req, res) => {
        const data = req.body;

        controller.updateUsers(
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

function getIp(req) {
    return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
}

function savePersonToPublicFolder(person, callback) {
    fs.writeFile('../db/users.json', JSON.stringify(person), callback);
}

function getUsers(success, error) {
    while (!progress) {
        progress = true;
        fs.readFile('./server/db/users.json', 'utf8', (err, data) => {
            progress = false;
            if (err) {
                error({error: err});
            } else {
                success(JSON.parse(data));
            }
        });
    }
}