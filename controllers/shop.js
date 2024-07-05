const Product = require('../models/product');
const Cart=require('../models/cart');
const CartItem=require('../models/cart-item')

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
  req.user.getCart()
  .then(cart=>{
    return cart.getProducts()
    .then(product=>{
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products:product
      })
    })
    .catch(err=>{
      console.log(err)
    })
  })
  .catch(err=>console.log(err))
 
}; 

exports.postCart=(req,res,next)=>{
  const prodId=req.body.productId
  let fetchedCart;
  let newQuantity=1
  req.user.getCart()
  .then(cart=>{
    fetchedCart=cart
      return cart.getProducts({where:{id:prodId}})
  })
  .then(products=>{
     let product;
     if(products.length>0)
     {
      product=products[0];
     }
   
     if(product)
     {
       const oldQuantity=product.cartItem.quantity
       newQuantity=oldQuantity+1
      // return fetchedCart.addProduct(product,{through:{quantity:newQuantity}})
       
     }
     return Product.findByPk(prodId)
     
     })
     .then(product=>{
      return fetchedCart.addProduct(product,{through:{quantity:newQuantity}})
     })
     
     .catch(err=>{
      console.log(err)
  })
  .then(()=>{
    res.redirect('/cart')
  })
  
 
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

exports.deleteCartItem=(req,res,next)=>{
   const prodId=req.body.productId
 
   req.user.getCart()
  .then(cart=>{
    
      return cart.getProducts({where:{id:prodId}})
  })
  .then(prods=>{
    return prods[0].cartItem.destroy()
  })
  .then(result=>{
    res.redirect('/cart')
  })
  
  /* CartItem.findAll({where:{productId:prodId}})
   .then(prod=>{
      //console.log(prod[0].quantity)
      let qty=prod[0].quantity
      if(qty>1)
      {
        qty=qty-1
        return fetchedCart.addProduct(prod[0],{through:{quantity:qty}})
      }
     return prod.destroy() 
   })*/
   //console.log(prodId)
}


