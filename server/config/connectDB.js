import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected successfully'.green.underline)
  } catch (error) {
    console.log('MongoDB error:'.red.underline, error)
    process.exit(1)
  }
}

export default connectDB
