const express = require('express');
const app = express();
const cors = require('cors');

const {getTopics, getServerDocs, getArticle, getAllArticles, getCommentsByArticleId, addComment, getArticleToPatch} = require('./controllers/controller')

app.use(cors())
app.use(express.json())
app.get('/api/topics', getTopics)
app.get('/api', getServerDocs)
app.get('/api/articles/:article_id', getArticle)
app.get('/api/articles', getAllArticles)
app.get('/api/articles/:article_id/comments', getCommentsByArticleId)

app.post('/api/articles/:article_id/comments', addComment)

app.patch('/api/articles/:article_id', getArticleToPatch)

app.use((err, req, res, next) => {
    if(err.status && err.msg) {
        res.status(err.status).send({msg: err.msg})
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

module.exports = app