var express = require('express');
var router = express.Router();
var movies = [
    {id: 101, name: "La la land", year: 2021, rating: 8.8},
    {id: 102, name: "Me Before You", year: 2020, rating: 8.4},
    {id: 103, name: "Inception", year: 2018, rating: 8.1},
    {id: 104, name: "The Conjuring", year: 2014, rating: 8.3},
    {id: 105, name: "A Man Called Otto", year: 2022, rating: 8.9}
];

router.get('/:id([0-9]{3,})', function(req, res){
    var currMovie = movies.filter(function (movie) {
        if (movie.id == req.params.id) {
            return true;
        }
    });

    if (currMovie.length == 1) {
        res.json(currMovie[0]);
    } else {
        res.status(404);
        res.json({message: 'Not Found'});
    }
});

router.post('/', function (req, res) {
    if (
        !req.body.name ||
        !req.body.year.toString().match(/^[0-9]{4}$/g) ||
        !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g)
    ) {
        res.status(400);
        res.json({message: 'Bad Request'});
    } else {
        var newId = movies[movies.length - 1].id + 1;
        movies.push({
            id: newId,
            name: req.body.name,
            year: req.body.year,
            rating: req.body.rating,
        });
        res.json({ message: 'New movie created', location: '/movies/' + newId});
    }
});

router.put('/:id', function (req, res) {
    if (
        !req.body.name ||
        !req.body.year.toString().match(/^[0-9]{4}$/g) ||
        !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g) ||
        !req.body.params.id.toString().match(/^[0-9]{3,}$/g)
    ) {
        res.status(400);
        res.json({message: 'Bad Request'});
    } else {
        var updateIndex = movies
        .map(function (movie) {
            return movie.id;
        })
        .indexOf(parseInt(req.params.id));

    if (updateIndex === -1) {
        movies.push({
            id: req.params.id,
            name:req.body.name,
            year: req.body.year,
            rating:req.body.rating,
        });
        res.json({
            message: 'New Movie Created.',
            location: '/movies/' + req.params.id,
        });
    } else {
        movies[updateIndex] = {
            id: req.params.id,
            name:req.body.name,
            year: req.body.year,
            rating:req.body.rating,
        };
        res.json({
            message: 'Movie id' + req.params.id + 'updated.',
            location: '/movies/' + req.params.id,
        });
    }
}
});

router.delete('/:id', function (req, res) {
    var removeIndex = movies
    .map(function (movie) {
        return movie.id;
    })
    .indexOf(req.params.id);

    if (removeIndex === -1) {
        res.json({ message: 'Not found'});
    } else {
        movies.splice(removeIndex, 1);
        res.send({ message: 'Movie id' + req.params.id + ' removed.'});
    }
});
module.exports = router;