# Northcoders News API

In order to successfully connect to the two databases locally you will need to create .env.test, with PGDATABASE=nc_news_test inside, and .env.development, with  PGDATABASE=nc_news inside.  

NC News is a project I worked on during the Northcoders Bootcamp. This is the first build I had done of this size and was created over the span of 5 days. For the Frontend I used React to **Build** and Netlify to **Host**, and for the Backend API I used Express and PostgreSQL to **Build** and ElephantSQL and Render to **Host**.

Click this link to view NC News
(https://nc-noos.netlify.app/)

## Features
    - View article(s)
    - Upvote or Downvote and article
    - Post a comment

# Minimum Requirements
    - Node.js version 20.5.0

## Installation
All instructions must be typed into an instance of Linux command line

    1. Clone the repo using `git clone https://github.com/lukepeteers/nc-news-BE.git`
    2. Move into your cloned repo using `cd nc-news-BE`
    3. Create two new files within the nc-news-BE folder called `.env.test` and `.env.development`
    4. Inside of .env.test paste in : `PGDATABASE=nc_news_test` and into .env.development paste: `PGDATABASE=nc_news`
    5. Type `npm run seed` to seed the database
    6. Use `node listen.js` to host locally, which can be queried using Insomnia or other similar software,, at localhost:9090