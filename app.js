const express = require('express');
const app = express();

const {getTopics, getServerDocs} = require('./controllers/controller')

app.get('/api/topics', getTopics)
app.get('/api', getServerDocs)

const {getTopics} = require('./controllers/controller')

app.get('/api/topics', getTopics)


module.exports = app