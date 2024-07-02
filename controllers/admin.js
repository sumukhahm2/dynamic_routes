const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing:false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
   Product.create({
    title:title,
    price:price,
    imageUrl:imageUrl,
    description:description
   })
  .then((result)=>{
   //console.log(result)
   res.redirect('/admin/products')
  })
  .catch(err=>{
    console.log(err)
  });
   
};

exports.getEditProduct = (req, res, next) => {
  const editMode=req.query.edit
  if(!editMode)
  {
    return res.redirect('/')
  }
 const prodId=req.params.productId
 Product.findByPk(prodId)
 .then(product=>{
  if(!product)
  {
    res.redirect('/')
  }
  res.render('admin/edit-product', {
    pageTitle: 'Edit Product',
    path: '/admin/edit-product',
    editing: editMode,
    product:product
  });
 })
 .catch((error)=>{
  console.log(error)
 })
 
};

exports.postEditProducts=(req,res,next)=>
{
   const prodId=req.body.productId
   const updatedTitle=req.body.title
   const updatedImage=req.body.imageUrl
   const updatedDec=req.body.description
   const updatedPrice=req.body.price

    Product.findByPk(prodId)
   .then((product)=>{
    product.title=updatedTitle
    product.price=updatedPrice
    product.imageUrl=updatedImage
    product.description=updatedDec
   return  product.save()
    
   })
   .then(()=>{
    res.redirect('/admin/products')
   })
   .catch((error)=>{
    console.log(error)
   })
  
}



exports.getProducts = (req, res, next) => {
  Product.findAll().then((products)=>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch((error)=>{
    console.log(error)
  })
};


exports.postDeleteProducts = (req, res, next) => {
  const prodId=req.body.productId
  Product.findByPk(prodId).then((product)=>{
    return product.destroy()
  })
  .then((result)=>{
    console.log(result)

    res.redirect('/admin/products')
  })
  .catch((error)=>{
    console.log(error)
  })
};
