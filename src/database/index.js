
import mongoose from "mongoose";
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log(`Kết nối db thành công!`)
    } catch (error) {
        console.log(`Kết nối db thất bại!`, error.message)
    }
};

export default connectDB;