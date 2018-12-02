const logger = require('morgan')
const errorHandler =require('errorhandler')
const bodyParser = require('body-parser')
const express = require('express')
const { validationResult } = require('express-validator/check')

var mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/renthub-db')

// declare a Schema
var Schema = mongoose.Schema

// create a schema for post
const postsSchema = new Schema (
	{
		title: String,
        description: String,
        address: String,
        pincode: String 
	})

// create a model which uses the Schema
var Post = mongoose.model('Post',postsSchema)

let app = express()
app.use(logger('dev'))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))

// Render the html home page
app.get('/',function(req,res){
	Post.find({}, null, {limit: 10},(error,posts)=>{
   	 if (error) {
   	 	console.log('error: '+error)
   	 	process.exit(1)
   	   }
  	res.render('home',{"postList":posts})
})
})

// API to get all the posts
app.get('/posts',(req,res)=>{
  Post.find({}, null, {limit: 10},(error,posts)=>{
   	 if (error) {
   	 	console.log('error: '+error)
   	 	process.exit(1)
   	   }
   	   res.send(posts)
   	   //res.sendFile('index.html');
   	})
   })

//API to create a new post
app.post('/',(req,res)=>{
  //validate the request
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() })
        }   
  console.log(req.body)
  console.log(req.headers['content-type'])
  if(!req.body.title || !req.body.description || !req.body.address || !req.body.pincode ) return res.sendStatus(400)
    // create a new post
    let post = new Post ({
    	title: req.body.title,
    	description: req.body.description,
    	address:req.body.address,
    	pincode: req.body.pincode
    })
    //saves the post
    post.save((error)=>{
    	if (error) throw error
      res.status(201).send('Post created!')
    })
}) 

// API to update the post
app.put('/posts/:id',(req,res)=>{
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() })
        } 
  //find the post by ID
  //TODO
   
   // check if the post exist.
  // TODO
    // update the change
    //TODO

    //save the function
    // TODO
    res.status(200).send('Updated successfully')
    })


//API to delete the post
app.delete('/post/:id',(req,res)=>{
 
}) 


//listening to port 3000
app.listen(3000,function() {
  console.log('listening to port 3000')
})