import {Router} from 'express'
import Product from '../models/Product.js'

const productRouter = Router()

productRouter.post('/', async (req, res) => {
  try {
    const product = new Product(req.body)
    await product.save()
    res.status(201).json(product)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

export default productRouter
