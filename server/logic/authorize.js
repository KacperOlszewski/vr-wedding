const users = {
    123456: {
        name: "Muszla", going: false, house: null, token: 123456, fbId: 100000243531643
    },

    hack: {
        name: "U hack, u suck", going: false, house: null, token: 123456
    }
};
const hack = 'hack';

module.exports = function(server, basePath) {
    const session = {};
    const authEndpoint = basePath + 'authorize';
    const getUserEndpoint = basePath + 'user/:token';

    server.post(authEndpoint , (req, res) => {
        const data = req.body;
        const authorizedUser = Boolean(users[data.pass]);

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
        const ip = getIp(req);
        const authorizedUser = users[session[ip]];

        if (authorizedUser) {
            res.send(authorizedUser);

        } else {
            res.send(users[hack]);
        }

        delete session[ip];
    });
};

function getIp(req) {
    return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
}