const express = require('express')
const router = express.Router()
//controllers
const { create, list, read, update, remove, listby, searchFilters } = require('../controllers/product')


// @ENDPOINT 
router.post('/product', create)
router.get('/products/:count', list)
router.get('/product/:id', read)
router.put('/product/:id', update)
router.delete('/product/:id', remove)
router.post('/productby', listby)
router.post('/search/filters', searchFilters)






module.exports = router