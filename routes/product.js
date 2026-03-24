import { Router } from 'express'
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

productRouter.get('/products', async (req, res) => {
  try {
    const { category, sort } = req.query
    let filter = {}
    if (category) filter.category = category

    let query = Product.find(filter)

    if (sort === 'asc') query = query.sort({ price: 1 })
    if (sort === 'desc') query = query.sort({ price: -1 })

    const products = await query
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

productRouter.put('/products/:id', async (req, res) => {
  try {
    const update = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })

    res.json(update)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

productRouter.delete('/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.json({ message: 'Product deleted' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

export default productRouter
