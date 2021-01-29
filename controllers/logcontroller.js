let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validate-session');
const Log = require('../db').import('../models/log');

// router.get('/practice', validateSession, function(req, res) {
//     res.send('this is a practice route')
// })

//CREATE NEW ENTRY

router.post('/', validateSession, (req, res) => {
    const logEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
        owner_id: req.user.id
    }
    Log.create(logEntry)
        .then(log => res.status(200).json(log))
        .catch(err => res.status(500).json({ error: err}))
})

//GET ALL ENTRIES FOR A USER

router.get("/", validateSession, (req, res) => {
    let userid = req.user.id
    Log.findAll( {
        where: { owner_id: userid }
    })
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({ error: err }))
});

//GET ENTRIES BY USER ID
router.get('/:id', validateSession, function (req, res) {
    const query = {where: {id: req.params.id}};
    Log.findAll(query)
    .then((logs) => res.status(200).json(logs))
    .catch((err) => res.status(500).json({ error: err }))
});

//UPDATE AN ENTRY

router.put("/:id", validateSession, function (req, res) {
    const updateLogEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result
    };
    const query = { where: { id: req.params.id, owner_id: req.user.id } };

    Log.update(updateLogEntry, query)
        .then((logs) => res.status(200).json(logs))
        .catch((err) => res.status(500).json({ error: err }));
});

//DELETE AN ENTRY

router.delete("/:id", validateSession, function (req, res) {
    const query = { where: { id: req.params.id, owner_id: req.user.id }};

    Log.destroy(query)
    .then(() => res.status(200).json({ message: "Log Entry Removed" }));
});

module.exports = router;