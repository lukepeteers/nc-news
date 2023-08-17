const request = require("supertest");
const app = require("../app.js");
const connection = require("../db/connection");
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data");

const endpointsTest = require('../endpoints.json')

beforeEach(() => {
    return seed(data);
});

afterAll(() => connection.end());

describe('GET', () => {
    test('404 - response with error message when given a url that doesnt exist on server', () => {
        return request(app)
        .get('/api/nonsense')
        .expect(404)
    });
    test('404 - receive a 404 when url entered is misspelt', () => {
            
        return request(app)
        .get('/api/articleses')
        .expect(404)
        
        }) 
    describe('/api/topics', () => {
        test('200 - responds with an array of objects with "slug" and "description" properties', () => {
            return request(app)
            .get('/api/topics')
            .expect(200)
            .then((response) => {
                const {rows} = response.body
                return rows.forEach((topic) => {
                    expect(topic).toHaveProperty('slug', expect.any(String))
                    expect(topic).toHaveProperty('description', expect.any(String))
                })
            })
        });   
    });
    describe('/api/articles/:article_id', () => {
        test('200 - responds with an object with a key of "article" and value as the desired object withcorrect properties', () => {
            
            return request(app)
            .get('/api/articles/2')
            .expect(200)
            .then(({body}) => {
                for(const key in body) {
                    const value = body[key]
                    expect(key).toBe('article')
                    expect(value).toHaveProperty('article_id', expect.any(Number))
                    expect(value).toHaveProperty('title', expect.any(String))
                    expect(value).toHaveProperty('topic', expect.any(String))
                    expect(value).toHaveProperty('author', expect.any(String))
                    expect(value).toHaveProperty('body', expect.any(String))
                    expect(value).toHaveProperty('created_at', expect.any(String))
                    expect(value).toHaveProperty('votes', expect.any(Number))
                    expect(value).toHaveProperty('article_img_url', expect.any(String))


                }
            })
        });

        test('404 - responds with "Not Found" when given an id that does not exist', () => {
            
            return request(app)
            .get('/api/articles/4200')
            .expect(404)
            .then(({body}) => {
                const {msg} = body
                expect(msg).toBe('Not Found')
            })
        });

        test('400 - responds with "Invalid Input" when id entered is not a number', () => {
            
            return request(app)
            .get('/api/articles/nazgûl')
            .expect(400)
            .then(({body}) => {
                const {msg} = body
                expect(msg).toBe('Invalid Input')
            })
        });
    });

    describe('/api', () => {
        test('200 - responds with object describing all the available endpoints on server', () => {
            return request(app)
            .get('/api')
            .expect(200)
            .then(({body}) => {
        
                expect(endpointsTest).toEqual(body)
            })
        });
    });

    describe('/api/articles', () => {
        test('200 - an articles array of article objects with the correct properties', () => {
            
            return request(app)
            .get('/api/articles')
            .expect(200)
            .then(({body}) => {
                body.forEach((article) => {  
                    expect(article).toHaveProperty('author', expect.any(String))
                    expect(article).toHaveProperty('title', expect.any(String))
                    expect(article).toHaveProperty('article_id', expect.any(Number))
                    expect(article).toHaveProperty('topic', expect.any(String))
                    expect(article).toHaveProperty('created_at', expect.any(String))
                    expect(article).toHaveProperty('votes', expect.any(Number))
                    expect(article).toHaveProperty('article_img_url', expect.any(String))
                    expect(article).toHaveProperty('comment_count', expect.any(Number))
                    expect(article).not.toHaveProperty('body')
                })
            })
        });
        
        test('200 - articles should be sorted by date descending', () => {
            
            return request(app)
            .get('/api/articles')
            .expect(200)
            .then(({body}) => {
                expect(body).toBeSortedBy('created_at', {
                    descending: true
                })
            })
        });
        });


        

    });

    describe('POST', () => {
        describe('/api/articles/:article_id/comments', () => {
            test('201 - receive the posted comment', () => {
                
                return request(app)
                .post('/api/articles/2/comments')
                .send({username: 'butter_bridge', body: 'am body n soul'})
                .expect(201)
                .then(({body}) => {
                    const comment = body.comment[0]
                    console.log(comment)
                    expect(comment).toHaveProperty('comment_id', expect.any(Number))
                    expect(comment).toHaveProperty('body', expect.any(String))
                    expect(comment).toHaveProperty('article_id', expect.any(Number))
                    expect(comment).toHaveProperty('author', expect.any(String))
                    expect(comment).toHaveProperty('votes', expect.any(Number))
                    expect(comment).toHaveProperty('created_at', expect.any(String))

                })
            });
            test('400 - responds with an error message when body is malformed / is missing required fields', () => {
                
                return request(app)
                .post('/api/articles/2/comments')
                .send({})
                .expect(400)
                .then(({body}) => {
                    const {msg} = body
                    expect(msg).toBe('Bad Request')
                })
            });
            test('400 - responds with an error message when schema validaton has failed', () => {
                
                return request(app)
                .post('/api/articles/2/comments')
                .send({nothingness: 'nothing here'})
                .expect(400)
                .then(({body}) => {
                    const {msg} = body
                    expect(msg).toBe('Bad Request')
                })
            });
            test('400 - returns an error message when a none numerical character is entered as ID', () => {
                
                return request(app)
                .post('/api/articles/nonesense/comments')
                .send({username: 'butter_bridge', body: 'am body n soul'})

        describe('/api/articles/:article_id/comments', () => {
            test('200 - responds with an array of comment object(s) with the correct properties', () => {
                return request(app)
                .get('/api/articles/1/comments')
                .expect(200)
                .then(({body}) => {
                    body.forEach((comment) => {
                        expect(comment).toHaveProperty('comment_id', expect.any(Number))
                        expect(comment).toHaveProperty('votes', expect.any(Number))
                        expect(comment).toHaveProperty('created_at', expect.any(String))
                        expect(comment).toHaveProperty('author', expect.any(String))
                        expect(comment).toHaveProperty('body', expect.any(String))
                        expect(comment).toHaveProperty('article_id', expect.any(Number))
                    })
                })
            });
            test('200 - comments should be sorted by most recent first', () => {
                return request(app)
                .get('/api/articles/1/comments')
                .expect(200)
                .then(({body}) => {
                    expect(body).toBeSortedBy('created_at', {
                        descending: true
                    })
                })
            });
            test('200 - returns an empty array ', () => {
               return request(app)
               .get('/api/articles/4/comments')
               .expect(200)
               .then(({body}) => {
                expect(body).toEqual([])
               })
            }); 
            test('404 - responds with error when targeting a ID that does not exist', () => {
                return request(app)
                .get('/api/articles/999999/comments')
                .expect(404)
                .then(({body}) => {
                    const {msg} = body
                    expect(msg).toBe('No article exists with that ID')
                })
            });
            test('400 - responds with error when given invalid input for ID', () => {
                return request(app)
                .get('/api/articles/nonesense/comments')
                .expect(400)
                .then(({body}) => {
                    const {msg} = body
                    expect(msg).toBe('Invalid Input')
                })
            });

            test('404 - returns an error message when no article exists with given id', () => {
                
                return request(app)
                .post('/api/articles/99999/comments')
                .send({username: 'butter_bridge', body: 'am body n soul'})
                .expect(404)
                .then(({body}) => {
                    const {msg} = body
                    expect(msg).toBe('Not Found')
                })
            });
            test('404 - repsonds with an error when given username does not exist in database', () => {
                
                return request(app)
                .post('/api/articles/3/comments')
                .send({username: 'pukeleters', body: 'itsame'})
                .expect(404)
                .then(({body}) => {
                    const {msg} = body
                    expect(msg).toBe('Not Found')
                })
            });

        });
    });


