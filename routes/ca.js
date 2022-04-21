const express = require('express')
const { Op } = require('sequelize')
const router = express.Router()
const { news: News } = require('../models/')

router.get('/', async (req, res) => {
    const cas = await News.findAll()
    res.send(cas)
})

router.get('/search', async (req, res) => {
    const q = req.query.q
    const results = await News.findAll({
        where: {
            [Op.or]: [
                { 'title': { [Op.like]: '%' + q + '%' } },
                { 'description': { [Op.like]: '%' + q + '%' } },
                { 'source': { [Op.like]: '%' + q + '%' } },
                { 'author': { [Op.like]: '%' + q + '%' } },
            ]
        }
    })
    res.send(results)
})

module.exports = router