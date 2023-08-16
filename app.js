const express = require('express');
const app = express();
const {getTopics, getServerDocs, getArticle, getAllArticles, getCommentsByArticleId} = require('./controllers/controller')

app.get('/api/topics', getTopics)
app.get('/api', getServerDocs)
app.get('/api/articles/:article_id', getArticle)
app.get('/api/articles', getAllArticles)
app.get('/api/articles/:article_id/comments', getCommentsByArticleId)

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
    res.status(500).send({msg: 'Internal Server Error'})
})

app.get('/api/topics', getTopics)

module.exports = app