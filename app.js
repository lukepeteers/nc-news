const express = require('express');
const app = express();
const {getTopics, getServerDocs, getArticle, getAllArticles, addComment} = require('./controllers/controller')

app.use(express.json())
app.get('/api/topics', getTopics)
app.get('/api', getServerDocs)
app.get('/api/articles/:article_id', getArticle)
app.get('/api/articles', getAllArticles)

app.post('/api/articles/:article_id/comments', addComment)

app.use((err, req, res, next) => {
    if(err.status && err.msg) {
        res.status(err.status).send({msg: err.msg})
    } else next(err)
})

app.use((err, req, res, next) => {
    if(err.status === 404) {
        res.status(err.status).send({msg: 'Not Found'})
    } else next(err)
})

app.use((err, req, res, next) => {
    if(err.code === '22P02') {
        res.status(400).send({msg: 'Invalid Input'})
    } else next(err)
})

app.use((err, req, res, next) => {
    if(err.code === '23502') {
        res.status(400).send({msg: 'Bad Request'})
    } else next(err)
})

app.use((err, req, res, next) => {
    if(err.code === '23503') {
        res.status(404).send({msg: 'Not Found'})
    } else next(err)
})

app.use((err, req, res, next) => {
    res.status(500).send({msg: 'Internal Server Error'})
})

app.get('/api/topics', getTopics)

module.exports = app