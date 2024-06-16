const Product = require('../models/product');
const Cart=require('../models/cart')

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([row,fieldData])=>{
    res.render('shop/product-list', {
      prods: row,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(
    error=>{
      console.log(error)
    }
  )
   
};

exports.getProduct=(req,res,next)=>{
  const prodId=req.params.productId
  Product.findById(prodId)
  .then(([product])=>{
    res.render('shop/product-detail',
    {product: product[0],
      pageTitle:product.title,
      path:'/products'
    })
  })
  .catch(error=>{
    console.log(error)
  })

}

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
  .then(([row,fieldData])=>{
    res.render('shop/index', {
      prods: row,
      pageTitle: 'Shop',
      path: '/'
    });
  })
   .catch(error=>
    {
    console.log(error)
    })
   
  
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.postCart=(req,res,next)=>{
  const prodId=req.body.productId
  Product.findById(prodId,(product)=>{
    Cart.addProduct(prodId,product.price)
  })
  res.redirect('/cart')
}
exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
