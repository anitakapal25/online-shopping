const express = require('express')// is used to import the Express.js framework. Express.js is a web application framework for Node.js that simplifies the process of building web and mobile applications. It provides a set of features and tools to help with routing, middleware, template engines, and more, making it easier to create server-side applications.
const app = express()//the express() function is the core function of the Express.js web framework. When you call express(), it creates an instance of an Express application. This application object has methods for handling HTTP requests, defining routes, setting up middleware, and more.
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const multer = require('multer') //Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. NOTE: Multer will not process any form which is not multipart (multipart/form-data).
const path = require('path') //include the built-in path module. The path module provides a way of working with file and directory paths. It contains methods that allow you to manipulate file paths, such as joining paths, resolving relative paths, extracting directory names,
const cors = require('cors')
const bodyParser = require('body-parser');


const shortid = require("shortid");
require("dotenv").config();
app.use(bodyParser.json());
app.use(express.json()) // express.json() is a middleware function provided by the Express.js web framework. This middleware is used to parse incoming JSON payloads in the request body. When a client sends a request with a JSON payload (e.g., through a POST or PUT request), express.json() helps to parse that JSON data and make it available in the request.body object.
app.use(cors())//The cors package is a middleware for Express.js that simplifies the process of handling CORS in your application. app.use(cors()) is used to enable Cross-Origin Resource Sharing (CORS). CORS is a security feature implemented by web browsers to restrict web pages from making requests to a different domain than the one that served the web page. 

const Razorpay = require("razorpay");

//Database connection with mongoDB
mongoose.connect(process.env.URI)

var razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});
        

//api  creation

app.get("/",(req,res)=>{
    res.send("Express App is running")
})

//to configure the storage engine for handling file uploads to the disk.
const storage = multer.diskStorage({
    destination: '/tmp/',
    filename:(req,file,cb)=>{
        // Specify the destination folder where the uploaded files will be stored
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})
//creating upload endpoint for images
app.use('/images',express.static('tmp'))
app.post('/upload',upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`${process.env.BASE_URL}/images/${req.file.filename}`
    })
})

//schema for creating product
const Product = mongoose.model("Product",{
    id:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type: String,
        required: true
    },
    new_price:{
        type: Number,
        required: true
    },
    old_price:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    available:{
        type: Boolean,
        default:true
    },
})

app.post('/addproduct',async (req,res) => {
    let products = await Product.find({});
    let id;
    if(products.length > 0){
        let last_product_array = products.slice(-1)
        let last_product = last_product_array[0]
        id = last_product.id+1;
    }else{
        id=1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    })
    console.log(product)
    await product.save()
    console.log("Saved")
    res.json({
        success:true,
        name:req.body.name
    })
})

//creating aPI to delete product

app.post('/removeproduct',async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id})
    console.log("Removed")
    res.json({
        success:true,
        name:req.body.name
    })
})

//get all products

app.get('/allproducts',async(req,res)=>{
    let products = await Product.find({});
    console.log("All products fetched")
    res.send(products)
})

//Schema for creating user model
const User = mongoose.model('User',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now
    }
})
//create endpoint to register user
app.post('/signup',async(req,res)=>{
    let check = await User.findOne({email:req.body.email})
    if(check){
        return res.status(400).json({success:false,errors:'exists user with this emailId'})
    }
    let cart = {}
    for(let i=0; i<300; i++){
        cart[i] = 0;
    }
    const user = new User({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    await user.save()

    const data = {
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data,'secret_ecom')
    res.json({success:true,token})
})

//login endpoint
app.post('/login',async(req,res)=>{
    let user = await User.findOne({email:req.body.email})
    if(user){
        const passCompare = req.body.password === user.password
        if(passCompare){
            // If the passwords match, prepare a payload for the JWT
            const data={
                user:{
                    id:user.id
                }
            }
            // Sign the JWT with a secret key
            const token = jwt.sign(data,'secret_ecom')
            res.json({success:true,token})
        }else{
            res.json({success:false,errors:"Wrong Password"})
        }
    }else{
        res.json({success:false,errors:"Wrong Email Id"})
    }
})

// endpoint for popular in women section
app.get('/popularinwomen',async(req,res)=>{
    let products = await Product.find({category:"women"})
    let popular_in_women = products.slice(0,4)
    console.log("Popular in women")
    res.send(popular_in_women)
})

//creating middleware to fetch user
const fetchUser = async(req,res,next)=>{
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({errors:"Please authenticate using a valid token"})
    }
    else{
        try{
            const data = jwt.verify(token,'secret_ecom')
            req.user = data.user;
            next();
        }catch(error){
            res.status(401).send({errors:"Please authenticate using a valid token"})
        }
    }
}

//endpoint for adding products in cart
app.post('/addtocart',fetchUser,async(req,res)=>{
    console.log(req.body,req.user);
    let userData = await User.findOne({_id:req.user.id})
    userData.cartData[req.body.itemId] += 1;
    const result = await User.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    console.log(result);
    res.send("Added")
})

//remove product from cartData
app.post('/removefromcart',fetchUser,async(req,res)=>{
    console.log('removed',req.body.itemId)
    let userData = await User.findOne({_id:req.user.id})
    if(userData.cartData[req.body.itemId] > 0){
        userData.cartData[req.body.itemId] -= 1;
        await User.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    }
    res.send("Removed")
})

//get cartdata
app.post('/getcart',fetchUser,async(req,res)=>{
    console.log('get cart')
    let userData = await User.findOne({_id:req.user.id})
    res.json(userData.cartData)
})

const orderSchema = new mongoose.Schema({
    razorpay_order_id: String,
    amount: Number,
    currency: String,
    receipt: String,
    status: String,
    created_at: { type: Date, default: Date.now }
  });
  
const Order = mongoose.model('Order', orderSchema);
// Save order details to the database

app.post('/checkout', async (req, res) => {
    console.log("Checkout params",req.body)
    const { amount,items } = req.body;
    const receipt = shortid.generate()

  if (!amount || isNaN(amount)) {
    return res.status(400).json({
      message: "Invalid amount",
    });
  }
  console.log(items);
   
  const newOrder = new Order({
    amount: amount * 100,
    currency: "INR",
    receipt: receipt,
    cartData: items,
    status: "pending"
  });
  
  await newOrder.save();
//   await User.findOneAndUpdate({_id:req.user.id},{cartData:[]})
  const options = {
    amount: amount * 100, // amount in the smallest currency unit (e.g., paise for INR)
    currency: "INR",
    receipt: receipt,
  };

  razorpay.orders.create(options, (err, order) => {
    if (err) {
      return res.status(500).json({
        message: "Order creation failed",
        error: err,
      });
    }

    res.status(200).json({
      message: "Order created",
      data: newOrder,
    });
  });
})

app.listen(process.env.PORT,(error)=>{
    if(!error){
        console.log("Server Running on port "+process.env.PORT)
    }else{
        console.log("Error : "+error)
    }
})