const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());


router.get('/details/:id', (req, res) => {
    console.log('getting event details, req.params.id is:', req.params.id)
    const sqlText = `select creator_id, title, date, time, location, events.id, username as host from events join "user" on "user".id = events.creator_id where events.id = $1;`
    const sqlData = [req.params.id]
    pool.query(sqlText, sqlData)
        .then((response) => {
            res.send(response.rows)
        })
        .catch((error) => {
            console.log('error retrieving event details', error);
            res.sendStatus(500)
        })
});

router.get('/guests/:id', (req, res) => {
    console.log('getting event guests, req.params.id is:', req.params.id)
    const sqlText = `select event_id, user_id, username, status from events_users join "user" on events_users.user_id = "user".id where event_id = $1;`
    const sqlData = [req.params.id]
    pool.query(sqlText, sqlData)
        .then((response) => {
            res.send(response.rows)
        })
        .catch((error) => {
            console.log('error retrieving event guests', error);
            res.sendStatus(500)
        })
});

router.get('/games/:id', (req, res) => {
    console.log('getting event games, req.params.id is:', req.params.id)
    const sqlText = `select event_id, game_id, user_id, name , username from events_games join games on events_games.game_id = games.atlas_id join "user" on "user".id = events_games.user_id where event_id = $1;`
    const sqlData = [req.params.id]
    pool.query(sqlText, sqlData)
        .then((response) => {
            res.send(response.rows)
        })
        .catch((error) => {
            console.log('error retrieving event games', error);
            res.sendStatus(500)
        })
});

router.get('/:id', (req, res) => {
    console.log('getting list of events for user, req.params.id is:', req.params.id)
    const sqlText = `(select events.id, creator_id, title, to_char(date, 'Month DD YYYY'), time, location, username from events join "user" on "user".id = events.creator_id where creator_id = $1) union (select event_id as id, creator_id, title, to_char(date, 'Month DD, YYYY'), time, location, username from events join "user" on "user".id = events.creator_id join events_users on events_users.event_id = events.id where user_id = $1) order by to_char desc;`
    const sqlData = [req.params.id]
    pool.query(sqlText, sqlData)
        .then((response) => {
            res.send(response.rows)
        })
        .catch((error) => {
            console.log('error retrieving events list', error);
            res.sendStatus(500)
        })
});

router.get('/users/:id', (req, res) => {
    console.log('getting list of users, req.params.id is:', req.params.id)
    const sqlText = 'select id, username from "user" where not "user".id = $1;'
    const sqlData = [req.params.id]
    pool.query(sqlText, sqlData)
        .then((response) => {
            res.send(response.rows)
        })
        .catch((error) => {
            console.log('error retrieving user list', error);
            res.sendStatus(500)
        })
});

router.get('/requests/:id', (req, res) => {
    console.log('getting list pending friend requests, req.params.id is:', req.params.id)
    const sqlText = `select user1, user2, username, status from friends join "user" on friends.user1 = "user".id where friends.user2 = $1 and status = 'pending';`
    const sqlData = [req.params.id]
    pool.query(sqlText, sqlData)
        .then((response) => {
            res.send(response.rows)
        })
        .catch((error) => {
            console.log('error retrieving user list', error);
            res.sendStatus(500)
        })
});

router.get('/checkFlag/:id', (req, res) => {
    console.log('checking if user is flagged, req.params.id is:', req.params.id)
    const sqlText = `select new_invite from "user" where "user".id = $1;`
    const sqlData = [req.params.id]
    pool.query(sqlText, sqlData)
        .then((response) => {
            res.send(response.rows[0])
        })
        .catch((error) => {
            console.log('error retrieving user list', error);
            res.sendStatus(500)
        })
});

router.post('/', (req, res) => {
    console.log('in post a new event, req.body is:', req.body);
    const sqlText = `insert into events (creator_id, title, date, time, location) VALUES ($1, $2, $3, $4, $5) RETURNING "id";`;
    const sqlValues = [req.body.creator_id, req.body.title, req.body.date, req.body.time, req.body.location];
    pool.query(sqlText, sqlValues)
        .then((response) => {
            res.send(response.rows[0])
        })
        .catch((error) => {
            console.log('error posting game', error)
            res.sendStatus(500)
        })
})

router.post('/addgame', (req, res) => {
    console.log('in post a new game to event, req.body is:', req.body);
    const sqlText = `insert into events_games (event_id, game_id, user_id) VALUES ($1, $2, $3);`;
    const sqlValues = [req.body.event_id, req.body.game_id, req.body.user_id];
    pool.query(sqlText, sqlValues)
        .then((response) => {
            res.sendStatus(201)
        })
        .catch((error) => {
            console.log('error posting event game', error)
            res.sendStatus(500)
        })
})

router.post('/eventID', (req, res) => {
    const sqlText = `select id from events where events.title = $1;`
    const sqlData = [req.body.title]
    pool.query(sqlText, sqlData)
        .then((response) => {
            res.send(response.rows)
        })
        .catch((error) => {
            console.log('error retrieving event ID', error);
            res.sendStatus(500)
        })
});

router.post('/eventguests', (req, res) => {
    const sqlText = `insert into events_users (event_id, user_id, status) VALUES ($1, $2, 'pending');`;
    const sqlValues = [req.body.event_id, req.body.user_id];
    pool.query(sqlText, sqlValues)
        .then((response) => {
            res.sendStatus(201)
        })
        .catch((error) => {
            console.log('error posting event guests', error)
            res.sendStatus(500)
        })
})

router.post('/eventgames', (req, res) => {
    const sqlText = `insert into events_games (event_id, game_id, user_id) VALUES ($1, $2, $3);`;
    const sqlValues = [req.body.event_id, req.body.game_id, req.body.creator_id];
    pool.query(sqlText, sqlValues)
        .then((response) => {
            res.sendStatus(201)
        })
        .catch((error) => {
            console.log('error posting event games', error)
            res.sendStatus(500)
        })
})

router.put('/accept', (req, res) => {
    console.log('in accept an event invitation, req.body is:', req.body)
    const sqlText = `update events_users set status = 'accepted' where event_id = $1 and user_id = $2;`;
    const sqlValues = [req.body.event_id, req.body.user_id];
    pool.query(sqlText, sqlValues)
        .then((response) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.log('error accepting event invitation', error)
            res.sendStatus(500)
        })
})

router.put('/flagguest/:id', (req, res) => {
    console.log('in flag guest user, req.params is:', req.params)
    const sqlText = `update "user" set new_invite = 1 where "user".id = $1`;
    const sqlValues = [req.params.id];
    pool.query(sqlText, sqlValues)
        .then((response) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.log('error flagging user for invite', error)
            res.sendStatus(500)
        })
})

router.put('/resolveflag/:id', (req, res) => {
    console.log('in resolve flag, req.params is:', req.params)
    const sqlText = `update "user" set new_invite = 0 where "user".id = $1`;
    const sqlValues = [req.params.id];
    pool.query(sqlText, sqlValues)
        .then((response) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.log('error unflagging user for invite', error)
            res.sendStatus(500)
        })
})

router.put('/decline', (req, res) => {
    console.log('in decline an event invitation, req.body is:', req.body)
    const sqlText = `update events_users set status = 'declined' where event_id = $1 and user_id = $2;`;
    const sqlValues = [req.body.event_id, req.body.user_id];
    pool.query(sqlText, sqlValues)
        .then((response) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.log('error declining event invitation', error)
            res.sendStatus(500)
        })
})

module.exports = router;