const Product = require("../models/product")
const User = require("../models/user")

module.exports.indexPage = async (req, res) => {
  const productsCount = await Product.count()
  const usersCount = await User.count()
  res.render('home/index', {
    productsCount: productsCount,
    usersCount: usersCount
  })
}

module.exports.docsPage = (req, res) => {
  res.json({
    'Get all product': 'GET /products',
    'Get a single': 'GET /products/:id',
    'Limit results': 'GET /products?limit=5',
    'Categories': {
      'Get all categories': 'GET /products/categories',
      'Get products in a specific category': 'GET /products/category/electronic',
    },
    'Add new product only Admins': {
      method: 'POST',
      Schema: {
        title: 'String',
        price: 'Number',
        description: 'String',
        image: 'String',
        category: 'String'
      }
    },
    'Update a product only Admins': {
      method: 'PUT',
      Schema: {
        title: 'String',
        price: 'Number',
        description: 'String',
        image: 'String',
        category: 'String'
      }
    },
    'Delete a product only Admins': 'DELETE /products/:id'
  })

}
