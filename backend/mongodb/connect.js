import mongoose from "mongoose";

const connectDb = (url) =>{
    mongoose.set('strictQuery', true) // for search functinality

    mongoose.connect(url)
        .then(()=>{console.log("Mongoose Connect")})
        .catch((err)=>console.log(err))
}

export default connectDb