const express = require('express');
const connectDB = require('./db');
const bodyParser = require('body-parser');
require("dotenv").config();
const multer = require("multer");
const path = require('path')
const cors = require('cors');
const UserModel = require('./models/User')

connectDB()

const app = express();
app.use(express.json())

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('public'))
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'public/images')
    },
    filename: (req, file, cb) =>{
        cb(null, file.fieldname + "_" + Date.now()+path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})
app.post('/upload',upload.single('file'), (req, res) =>{
    UserModel.create({image:req.file.filename})
    .then(result=> res.json(result))
    .catch(err => console.log(err))
});

app.get('/getImage', (req, res) =>{
    UserModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
const PORT = process.env.PORT || 5003;

app.get("/",(req,res) => {
    res.send("HELLO WORLD")
})

app.listen(PORT, ()=>{
    console.log(`server running on port : http://localhost:${PORT}/members`)
})
