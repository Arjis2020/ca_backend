//const db = require('../config')
require('dotenv').config()
const cron = require('node-schedule')
const Newsapi = require('newsapi')
const newsApi = new Newsapi(process.env.NEWS_API_KEY)
const { news: News } = require('../models/')

async function start() {
    cron.scheduleJob(`* */2 * * *`, async () => {
        try {
            console.log(`CA Cron ran at ${new Date().toTimeString()}`)
            var response = await newsApi.v2.topHeadlines({
                country: 'in',
                language: 'en',
                pageSize: 100,
                page: 1
            })
            let newsArr = []
            response.articles?.forEach(item => {
                if (item.title && item.description && item.url && item.urlToImage && item.publishedAt) {
                    newsArr.push({
                        title: item.title,
                        description: item.description.substring(0, 255),
                        image: item.urlToImage,
                        link: item.url,
                        source: item.source?.name,
                        author: item.author,
                        published_at: item.publishedAt
                    })
                }
            })

            await News.bulkCreate(newsArr, {
                updateOnDuplicate: ['title', 'description', 'image', 'link', 'source', 'author', 'published_at'],
                returning: false
            })
        }
        catch (err) {
            console.log(err)
        }
    })
}

module.exports = { start }