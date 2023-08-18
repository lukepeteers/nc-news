const connection = require('../db/connection')


exports.selectTopics = () => {
    return connection
    .query(`SELECT * FROM topics`)
    .then((topics) => {
        return topics
    })

}

exports.selectArticle = (article_id) => {
    return connection
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then(({rows}) => {
        if(rows.length === 0) {
            return Promise.reject({status: 404, msg: 'Not Found'})
        }
        return rows[0]
    })
}

exports.selectAllArticles = () => {
    return connection
    .query(`SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id)::INT AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC;`)
    .then(({rows}) => {
        
        return rows
    })
}

exports.selectCommentsByArticleId = (article_id, next) => {
    return connection
    .query(`SELECT *
    FROM comments
    WHERE article_id = $1
    ORDER BY created_at DESC`, [article_id])
    .then((body) => {
        const {rows} = body
        return rows
    })
}

exports.insertComment = (reqBody, reqParams) => {
    const {username, body} = reqBody
    const {article_id} = reqParams
    return connection
    .query(`INSERT INTO comments (author, body, article_id)
    VALUES ($1, $2, $3) RETURNING *;`, [username, body, article_id])
    .then(({rows}) => {
        return rows
    })
}

exports.patchArticle = (body, params) => {
    const {article_id} = params
    const {inc_votes} = body
    
    return connection
    .query(`UPDATE articles
    SET votes = votes + $1
    WHERE article_id = $2
    RETURNING *
    `, [inc_votes, article_id])
    .then(({rows}) => {
        return rows[0]
    })
}