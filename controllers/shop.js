const Product = require('../models/product');
const Cart=require('../models/cart');


exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then((product)=>{
    res.render('shop/product-list', {
      prods: product,
      pageTitle: 'Shop',
      path: '/products'
  });
  })
   .catch(error=>
    {
    console.log(error)
    })
   
   
};

exports.getProduct=(req,res,next)=>{
  const prodId=req.params.productId
  Product.findAll({where:{id: prodId}})
  .then((products)=>{
    res.render('shop/product-detail',
    {product: products[0],
      pageTitle:products[0].title,
      path:'/products'
    })
  })
  .catch(error=>{
    console.log(error)
  })

}

exports.getIndex = (req, res, next) => {
 Product.findAll()
  .then((product)=>{
    res.render('shop/index', {
      prods: product,
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
