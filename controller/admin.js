const User = require('../models/user')
const Product = require('../models/product')

module.exports.getAdminPage = async (req, res) => {
  if (!res.locals.isAdmin) {
    res.redirect('/')
  } else {
    const allUsers = await User.find({})
    const allProducts = await Product.find({})
    res.render('admin/index', {
      allUsers: allUsers,
      allProducts: allProducts
    })
  }
}

module.exports.updateUser = async (req, res) => {
  if (typeof req.body == undefined) {
    res.json({
      status: 'error',
      message: 'User is undefined',
    });
  } else {
    await User.findByIdAndUpdate(req.params.id, req.body)
    res.redirect('/')
  }
}

module.exports.deleteUser = async (req, res) => {
  if (typeof req.body == undefined) {
    res.json({
      status: 'error',
      message: 'User is undefined',
    });
  } else {
    res.clearCookie("token");
    await User.findByIdAndDelete(req.params.id)
    res.redirect('/admin')
  }
}

module.exports.addProduct = async (req, res) => {
  if (typeof req.body == undefined) {
    res.json({
      status: 'error',
      message: 'User is undefined',
    });
  } else {
    const newProduct = {
      title: req.body.title,
      price: parseInt(req.body.price),
      description: req.body.description,
      image: req.body.image,
      category: req.body.category,
    }
    const product = await Product.create(newProduct)
    res.status(200).json(product);
  }
}

module.exports.editProduct = async (req, res) => {
  if (typeof req.body == undefined || req.params.id == null) {
    res.json({
      status: 'error',
      message: 'something went wrong! check your sent data',
    });
  } else {
    const newProduct = {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
      category: req.body.category,
    }
    const product = await Product.findByIdAndUpdate({ id: req.body.id }, newProduct)
    const savedProduct = await product.save()
    res.status(200).json(savedProduct)
  }
};

module.exports.deleteProduct = async (req, res) => {
  if (req.params.id == null) {
    res.json({
      status: 'error',
      message: 'cart id should be provided',
    });
  } else {
    await Product.findByIdAndDelete(req.params.id)
    res.redirect('/admin')
  }
};
