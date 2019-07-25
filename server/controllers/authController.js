const users = require('../models/users');
let id = 1;

module.exports = {
    login(req, res) {
        const { session } = req;
        const { username, password } = req.body;
        let user = users.find(e => e.username === username && e.password === password);
        if (user) {
            session.user.username = user.username;
            res.status(200).send(session.user);
        } else {
            res.status(500).send("Unauthorized.");
        }
    },
    register(req, res) {
        const { session } = req;
        const { username, password } = req.body;
        const newUser = { id, username, password };
        users.push(newUser);
        id++;
        session.user.username = username;
        res.status(200).send(session.user);
    },
    signout(req, res) {
        req.session.destroy();
        res.status(200).send(req.session);
    },
    getUser(req, res) {
        const { session } = req;
        res.status(200).send(session.user);
    }
}