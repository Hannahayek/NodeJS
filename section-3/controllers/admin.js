const Product = require('../models/product');


exports.getAddProduct = (req, res, next) => {
   res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing:false
       });
  };
  
  exports.postAddProduct = (req, res, next) => {
    const title=req.body.title;
    const imageUrl=req.body.imageUrl;
    const price=req.body.price;  
    const description=req.body.description;    
    const product = new Product(null,title,imageUrl,description,price);
    console.log(product);
    product.save();
    res.redirect('/');
  };

  exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
      return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    });
  };

  exports.postEditProduct=(req,res,next) =>{
     const prodId=req.body.productId;
     const updatedtitle=req.body.title;
     const UpdatedImageUrl=req.body.imageUrl;
     const UpdatedPrice=req.body.price;  
     const Updateddescription=req.body.description;
      const updatedProduct=new Product(prodId,updatedtitle,UpdatedImageUrl,Updateddescription,UpdatedPrice);
      console.log(prodId);
      updatedProduct.save();   
      res.redirect('/admin/products');
  };

  exports.getProducts= (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/product'
    
    });
  });


exports.postDeleteProduct=(req,res,next)=>{
  const prodId=req.body.productId;
}

};