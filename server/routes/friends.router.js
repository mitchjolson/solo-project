const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());


router.get('/:id', (req, res) => {
    console.log('getting friends for user, req.params.id is:', req.params.id)
    const sqlText = `(select username, friends.user2 as friend_ID, status from "user" join friends on friends.user2 = "user".id where friends.user1 = $1) union (select username, friends.user1 as friend_ID, status from "user" join friends on friends.user1 = "user".id where friends.user2 = $1);`
    const sqlData = [req.params.id]
    pool.query(sqlText, sqlData)
        .then((response) => {
            res.send(response.rows)
        })
        .catch((error) => {
            console.log('error retrieving friends list', error);
            res.sendStatus(500)
        })
});

router.get('/users/:id', (req, res) => {
    console.log('getting list of users, req.params.id is:', req.params.id)
    const sqlText = 'select id, username from "user" where not "user".id = $1 order by username asc;'
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
    console.log('in post a friend request, req.body is:', req.body);
    const sqlText = `insert into friends (user1, user2, status) VALUES ($1, $2, 'pending');`;
    const sqlValues = [req.body.user1, req.body.user2.id];
    pool.query(sqlText, sqlValues)
        .then((response) => {
            res.sendStatus(201)
        })
        .catch((error) => {
            console.log('error posting game', error)
            res.sendStatus(500)
        })
})

router.delete('/', (req, res) => {
    console.log('removing a friend, req.body is:', req.body);
    const sqlText = `delete from friends where user1 = $1 and user2 = $2;`;
    const sqlText2 = `delete from friends where user1 = $2 and user2 = $1;`;
    const sqlValues = [req.body.user.id, req.body.friend.friend_id];
    pool.query(sqlText, sqlValues)
    pool.query(sqlText2, sqlValues)
        .then((response) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.log('error removing friend', error);
            res.sendStatus(500)
        })
})

router.put('/approve', (req, res) => {
    console.log('in approve a friend request, req.body is:', req.body)
    const sqlText = `update friends set status = 'accepted' where user1 = $1 and user2 = $2;`;
    const sqlValues = [req.body.user1, req.body.user2];
    pool.query(sqlText, sqlValues)
        .then((response) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.log('error approving friend request', error)
            res.sendStatus(500)
        })
})

router.delete('/deny', (req, res) => {
    console.log('denying a friend request, req.body is:', req.body)
    const sqlText = `delete from friends where user1 = $1 and user2 = $2 and status = 'pending';`
    const sqlValues = [req.body.user1, req.body.user2]
    pool.query(sqlText, sqlValues)
        .then((response) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.log('error denying friend request', error);
            res.sendStatus(500)
        })
})

module.exports = router;