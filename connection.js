const mongoose=require("mongoose");

const MONGODB_URL='mongodb+srv://admin:admin@app.rp9v6.mongodb.net/?retryWrites=true&w=majority&appName=app';

const connectDB =async () =>{
    await mongoose.connect(MONGODB_URL,{
        useCreateIndex:true,
        useUnifiedTopology:true,
        useNewUrlParser:true,
        useFindAndModify:false
    });
    console.log('Product Management Data Connection is running');
}
module.exports=connectDB;

