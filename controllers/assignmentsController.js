const db = require("../models");

// Defining methods for the controller
module.exports = {
    findAll: function (req, res) {
        db.Assignment
            .findAll({})
            .then(dbAssignment => res.json(dbAssignment))
            .catch(err => res.status(422).json(err));
    },
    findByName: function (req, res) {
        db.Assignment
            .findOne({ where: { name: req.params.name } })
            .then(dbAssignment => res.json(dbAssignment))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        db.Assignment
            .create({
                name: req.body.name,
                description: req.body.description,
                topic: req.body.topic,
                due_date: req.body.date,
                points: req.body.points
            })
            .then(dbAssignment => res.json(dbAssignment))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.Assignment
            .destroy({
                where: {
                    name: req.params.name,
                },
            })
            .then(dbAssignment => res.json(dbAssignment))
            .catch(err => res.status(422).json(err));
    },
    update: function(req, res) {
      db.Assignment
        .findOneAndUpdate({ _id: req.params.name }, req.body)
        .then(dbAssignment => res.json(dbAssignment))
        .catch(err => res.status(422).json(err));
    },
};