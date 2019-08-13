const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

function checkPublisher(publisher) {
    if(publisher.length === 0){
        return 'none'
    }
    else{
        return publisher[0]
    }
}


checkCategory = (category) => {
    if( category.length === 0){
        return 'none'
    }
    else{
        return category[0].id;
    }
}

router.get('/:id', (req, res) => {
    console.log('getting games for user, req.params.id is:', req.params.id)
    const sqlText = 'select games.id, atlas_id, name, description, publisher, year_published, min_players, max_players, playtime, category, rating, image from games join user_games on games.atlas_id = user_games.game_id where user_id = $1 order by name asc;'
    const sqlData = [req.params.id]
    pool.query(sqlText, sqlData)
        .then((response) => {
            res.send(response.rows)
        })
        .catch((error) => {
            console.log('error getting collection', error);
            res.sendStatus(500)
        })
});

router.get('/log/:id', (req, res) => {
    console.log('getting activity log for friend, req.params.id is:', req.params.id)
    const sqlText = `select user_id, action, to_char(entry_date, 'Month DD YYYY'), name, username from game_log join games on game_log.game_id = games.atlas_id join "user" on game_log.user_id = "user".id where user_id = $1;;`
    const sqlData = [req.params.id]
    pool.query(sqlText, sqlData)
        .then((response) => {
            res.send(response.rows)
        })
        .catch((error) => {
            console.log('error getting friend activity log', error);
            res.sendStatus(500)
        })
});

router.delete('/:id', (req, res) => {
    console.log('removing a game from user collection, req.params.id is:', req.params.id)
    console.log('removing a game from user collection, req.body is:', req.body)
    const sqlText = 'delete from user_games where user_id = $1 and game_id = $2;'
    const sqlValues = [req.params.id, req.body.game_id]
    pool.query(sqlText, sqlValues)
        .then((response) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.log('error removing game from user collection', error);
            res.sendStatus(500)
        })
})

router.post('/checkcollection/:id', (req, res) => {
    console.log('checking to see if user already has game, req.params.id is:', req.params.id)
    console.log('checking to see if user already has game, req.body.id is:', req.body.id)
    const sqlText = 'select game_id from user_games join games on games.atlas_id = user_games.game_id where user_id = $1 and game_id = $2;'
    const sqlData = [req.params.id, req.body.id]
    pool.query(sqlText, sqlData)
        .then((response) => {
            res.send(response.rows)
        })
        .catch((error) => {
            console.log('error getting collection', error);
            res.sendStatus(500)
        })
});

router.post('/checkcollectionfromdetails/:id', (req, res) => {
    console.log('checking to see if user already has game, req.params.id is:', req.params.id)
    console.log('checking to see if user already has game, req.body.atlas_id is:', req.body.atlas_id)
    const sqlText = 'select game_id from user_games join games on games.atlas_id = user_games.game_id where user_id = $1 and game_id = $2;'
    const sqlData = [req.params.id, req.body.atlas_id]
    pool.query(sqlText, sqlData)
        .then((response) => {
            res.send(response.rows)
        })
        .catch((error) => {
            console.log('error getting collection', error);
            res.sendStatus(500)
        })
});

router.post('/checkgamedb', (req, res) => {
    console.log('checking to see if game exists in DB, req.body.id is:', req.body.id)
    const sqlText = 'select atlas_id from games where atlas_id = $1;'
    const sqlData = [req.body.id]
    pool.query(sqlText, sqlData)
        .then((response) => {
            res.send(response.rows)
        })
        .catch((error) => {
            console.log('error checking if game exists in DB', error);
            res.sendStatus(500)
        })
});

router.post('/checkgamedbfromdetails', (req, res) => {
    console.log('checking to see if game exists in DB, req.body.id is:', req.body.atlas_id,)
    const sqlText = 'select atlas_id from games where atlas_id = $1;'
    const sqlData = [req.body.atlas_id]
    pool.query(sqlText, sqlData)
        .then((response) => {
            res.send(response.rows)
        })
        .catch((error) => { 
            console.log('error checking if game exists in DB', error);
            res.sendStatus(500)
        })
});

router.post('/', (req, res) => {
    console.log('in post new game to DB')
    const sqlText = 'insert into games (atlas_id, name, description, publisher, year_published, min_players, max_players, playtime, category, rating, image) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);';
    const sqlValues = [req.body.id, req.body.name, req.body.description, checkPublisher(req.body.publishers), req.body.year_published, req.body.min_players, req.body.max_players, req.body.max_playtime, checkCategory(req.body.categories), req.body.average_user_rating, req.body.images.medium];
    pool.query(sqlText, sqlValues)
        .then((response) => {
            res.sendStatus(201)
        })
        .catch((error) => {
            console.log('error posting game', error)
            res.sendStatus(500)
        })
})

router.post('/addfromdetails', (req, res) => {
    console.log('in post new game to DB from details, req.body is:', req.body)
    const sqlText = 'insert into games (atlas_id, name, description, publisher, year_published, min_players, max_players, playtime, category, rating, image) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);';
    const sqlValues = [req.body.atlas_id, req.body.name, req.body.description, req.body.publisher, req.body.year_published, req.body.min_players, req.body.max_players, req.body.playtime, req.body.category, req.body.rating, req.body.image];
    pool.query(sqlText, sqlValues)
        .then((response) => {
            res.sendStatus(201)
        })
        .catch((error) => {
            console.log('error posting game', error)
            res.sendStatus(500)
        })
})

router.post('/link/:id', (req, res) => {
    console.log('linking game to user,', req.params.id, req.body.id)
    const sqlText = 'insert into user_games (user_id, game_id) values ($1, $2);';
    const sqlValues = [req.params.id, req.body.id];
    pool.query(sqlText, sqlValues)
        .then((response) => {
            res.sendStatus(201)
        })
        .catch((error) => {
            console.log('error linking game', error)
            res.sendStatus(500)
        })
})

router.post('/linkfromdetails/:id', (req, res) => {
    console.log('linking game to user,', req.params.id, req.body.atlas_id)
    const sqlText = 'insert into user_games (user_id, game_id) values ($1, $2);';
    const sqlValues = [req.params.id, req.body.atlas_id];
    pool.query(sqlText, sqlValues)
        .then((response) => {
            res.sendStatus(201)
        })
        .catch((error) => {
            console.log('error linking game', error)
            res.sendStatus(500)
        })
})

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;