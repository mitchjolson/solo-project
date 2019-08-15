const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());


router.get('/details/:id', (req, res) => {
    console.log('getting event details, req.params.id is:', req.params.id)
    const sqlText = `select * from events where id = $1;`
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
    const sqlText = `select * from events_games where event_id = $1;`
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

router.post('/eventID', (req, res) => {
    // console.log('getting event ID, req.body is:', req.body)
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
    // console.log('in post event guests, req.body is:', req.body);
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
    // console.log('in post event games, req.body is:', req.body);
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

// router.delete('/', (req, res) => {
//     console.log('removing a friend, req.body is:', req.body);
//     const sqlText = `delete from friends where user1 = $1 and user2 = $2;`;
//     const sqlText2 = `delete from friends where user1 = $2 and user2 = $1;`;
//     const sqlValues = [req.body.user.id, req.body.friend.friend_id];
//     pool.query(sqlText, sqlValues)
//     pool.query(sqlText2, sqlValues)
//         .then((response) => {
//             res.sendStatus(200)
//         })
//         .catch((error) => {
//             console.log('error removing friend', error);
//             res.sendStatus(500)
//         })
// })

// router.put('/approve', (req, res) => {
//     console.log('in approve a friend request, req.body is:', req.body)
//     const sqlText = `update friends set status = 'accepted' where user1 = $1 and user2 = $2;`;
//     const sqlValues = [req.body.user1, req.body.user2];
//     pool.query(sqlText, sqlValues)
//         .then((response) => {
//             res.sendStatus(200)
//         })
//         .catch((error) => {
//             console.log('error approving friend request', error)
//             res.sendStatus(500)
//         })
// })

// router.delete('/deny', (req, res) => {
//     console.log('denying a friend request, req.body is:', req.body)
//     const sqlText = `delete from friends where user1 = $1 and user2 = $2 and status = 'pending';`
//     const sqlValues = [req.body.user1, req.body.user2]
//     pool.query(sqlText, sqlValues)
//         .then((response) => {
//             res.sendStatus(200)
//         })
//         .catch((error) => {
//             console.log('error denying friend request', error);
//             res.sendStatus(500)
//         })
// })


// // not used below

// router.delete('/:id', (req, res) => {
//     console.log('removing a game from user collection, req.params.id is:', req.params.id)
//     console.log('removing a game from user collection, req.body is:', req.body)
//     const sqlText = 'delete from user_games where user_id = $1 and game_id = $2;'
//     const sqlValues = [req.params.id, req.body.game_id]
//     pool.query(sqlText, sqlValues)
//         .then((response) => {
//             res.sendStatus(200)
//         })
//         .catch((error) => {
//             console.log('error removing game from user collection', error);
//             res.sendStatus(500)
//         })
// })

// router.post('/checkcollection/:id', (req, res) => {
//     console.log('checking to see if user already has game, req.params.id is:', req.params.id)
//     console.log('checking to see if user already has game, req.body.id is:', req.body.id)
//     const sqlText = 'select game_id from user_games join games on games.atlas_id = user_games.game_id where user_id = $1 and game_id = $2;'
//     const sqlData = [req.params.id, req.body.id]
//     pool.query(sqlText, sqlData)
//         .then((response) => {
//             res.send(response.rows)
//         })
//         .catch((error) => {
//             console.log('error getting collection', error);
//             res.sendStatus(500)
//         })
// });

// router.post('/checkcollectionfromdetails/:id', (req, res) => {
//     console.log('checking to see if user already has game, req.params.id is:', req.params.id)
//     console.log('checking to see if user already has game, req.body.atlas_id is:', req.body.atlas_id)
//     const sqlText = 'select game_id from user_games join games on games.atlas_id = user_games.game_id where user_id = $1 and game_id = $2;'
//     const sqlData = [req.params.id, req.body.atlas_id]
//     pool.query(sqlText, sqlData)
//         .then((response) => {
//             res.send(response.rows)
//         })
//         .catch((error) => {
//             console.log('error getting collection', error);
//             res.sendStatus(500)
//         })
// });

// router.post('/checkgamedb', (req, res) => {
//     console.log('checking to see if game exists in DB, req.body.id is:', req.body.id)
//     const sqlText = 'select atlas_id from games where atlas_id = $1;'
//     const sqlData = [req.body.id]
//     pool.query(sqlText, sqlData)
//         .then((response) => {
//             res.send(response.rows)
//         })
//         .catch((error) => {
//             console.log('error checking if game exists in DB', error);
//             res.sendStatus(500)
//         })
// });

// router.post('/checkgamedbfromdetails', (req, res) => {
//     console.log('checking to see if game exists in DB, req.body.id is:', req.body.atlas_id)
//     const sqlText = 'select atlas_id from games where atlas_id = $1;'
//     const sqlData = [req.body.atlas_id]
//     pool.query(sqlText, sqlData)
//         .then((response) => {
//             res.send(response.rows)
//         })
//         .catch((error) => {
//             console.log('error checking if game exists in DB', error);
//             res.sendStatus(500)
//         })
// });

// router.post('/addfromdetails', (req, res) => {
//     console.log('in post new game to DB from details, req.body is:', req.body)
//     const sqlText = 'insert into games (atlas_id, name, description, publisher, year_published, min_players, max_players, playtime, category, rating, image) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);';
//     const sqlValues = [req.body.atlas_id, req.body.name, req.body.description, req.body.publisher, req.body.year_published, req.body.min_players, req.body.max_players, req.body.playtime, req.body.category, req.body.rating, req.body.image];
//     pool.query(sqlText, sqlValues)
//         .then((response) => {
//             res.sendStatus(201)
//         })
//         .catch((error) => {
//             console.log('error posting game', error)
//             res.sendStatus(500)
//         })
// })

// router.post('/link/:id', (req, res) => {
//     console.log('linking game to user,', req.params.id, req.body.id)
//     const sqlText = 'insert into user_games (user_id, game_id) values ($1, $2);';
//     const sqlValues = [req.params.id, req.body.id];
//     pool.query(sqlText, sqlValues)
//         .then((response) => {
//             res.sendStatus(201)
//         })
//         .catch((error) => {
//             console.log('error linking game', error)
//             res.sendStatus(500)
//         })
// })

// router.post('/linkfromdetails/:id', (req, res) => {
//     console.log('linking game to user,', req.params.id, req.body.atlas_id)
//     const sqlText = 'insert into user_games (user_id, game_id) values ($1, $2);';
//     const sqlValues = [req.params.id, req.body.atlas_id];
//     pool.query(sqlText, sqlValues)
//         .then((response) => {
//             res.sendStatus(201)
//         })
//         .catch((error) => {
//             console.log('error linking game', error)
//             res.sendStatus(500)
//         })
// })

module.exports = router;