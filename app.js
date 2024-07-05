const path = require('path');
const sequelize= require('./util/database')
const express = require('express');
const bodyParser = require('body-parser');
const Product=require('./models/product')
const User=require('./models/user')
const Cart=require('./models/cart')
const CartItem=require('./models/cart-item')
const errorController = require('./controllers/error');
const cors=require('cors');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(cors())
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const userRoutes = require('./routes/user')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
  User.findByPk(1)
  .then(user=>{
     req.user=user
     next()
  })
  .catch(err=>{
    console.log(err)
  })
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(userRoutes)

app.use(errorController.get404);

Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'})
User.hasMany(Product)
User.hasOne(Cart)
Cart.belongsTo(User)
Cart.belongsToMany(Product,{through:CartItem})
Product.belongsToMany(Cart,{through:CartItem})

sequelize.sync()
.then((result)=>{
    return User.findByPk(1)
   
})
.then(user=>{
    if(!user)
    {
        return User.create({username:'vighnaraj',email:'sumukhahm2@gmail.com',phoneNumber:'827343401'})
    }
    return user
})
.then(user=>{
    return user.createCart()
})
.then(cart=>{
    app.listen(3000)
})
.catch((error)=>{
    console.log(error)
})

 
 