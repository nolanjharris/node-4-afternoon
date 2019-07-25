const swag = require('../models/swag');

module.exports = {
    search(req, res) {
        let { category } = req.query;
        if (!category) {
            res.status(200).send(swag);
        } else {
            let filtered = swag.filter(e => e.category == category);
            res.status(200).send(category);
        }
    }
}