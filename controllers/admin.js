const Product = require('../models/product');

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
  const product = new Product(null,title, imageUrl, description, price);
  product.save()
  .then(()=>{
    res.redirect('/');
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
 Product.findById(prodId)
 .then(product=>{
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

   const updatedProduct=new Product(prodId,updatedTitle,updatedImage,updatedDec,updatedPrice)
   updatedProduct.save()
   .then(()=>{
    res.redirect('/admin/products')
   })
   .catch((error)=>{
    console.log(error)
   })
  
}

exports.postDeleteProduct=(req,res,next)=>{
  const prodId=req.body.productId
  console.log(prodId)
  Product.deleteById(prodId)
  .then(()=>{
    res.redirect('/admin/products')
  })
  .catch((error)=>{
    console.log(error)
  })
 

}

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(([products])=>{
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
