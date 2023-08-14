const request = require("supertest");
const app = require("../app.js");
const connection = require("../db/connection");
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data");

beforeEach(() => {
    return seed(data);
});

afterAll(() => connection.end());


describe('GET', () => {
    test('404 - response with error message when given a url that doesnt exist on server', () => {
        return request(app)
        .get('/api/pokeomon-news')
        .expect(404)
    });
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
});
