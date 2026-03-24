import mongoose from "mongoose";
import dotenv from "dotenv"
import 'colors'
dotenv.config()



const connectDB = () => {
  try {
     mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected successfully'.green.bold.underline)
  } catch (error) {
    console.log('MongoDB error:'.red.bold.underline)
    process.exit(1)
  }
}

export default connectDB