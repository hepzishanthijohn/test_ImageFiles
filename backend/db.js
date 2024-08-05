const mongoose = require("mongoose");

//connect to MongoDB
const connectDB=async()=>{
    await mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
console.log("MongoDB connected");
}

module.exports=connectDB;