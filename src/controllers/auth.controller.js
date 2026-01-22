import { asyncHandler } from "../utils/asyncHandler";
import bcrypt from "bcryptjs";
import User from '../models/user.model'
import jwt from 'jsonwebtoken'

export const signup = asyncHandler(async (req, res) => {
    // lấy dữ liệu từ client
    const { username, email, password } = req.body;
    // kiểm tra xem email có tồn tại không?

    const userExist = await User.findOne({ email });
    if (userExist) {
        return res.status(400).json({
            messsage: "Email đã tồn tại"
        })
    }
    // mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);
    // lưu vào cơ sở dữ liệu
    const user = await User.create({ username, email, password: hashedPassword });
    user.password = undefined;
    // trả về thông báo
    return user;
});
export const signin = asyncHandler(async (req, res) => {
    // lấy dữ liệu từ client gửi lên
    const { email, password } = req.body;
    // tìm user dựa trên email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({
            message: "Email không tồn tại!"
        })
    };

    // so sánh mật khẩu
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
        return res.status(400).json({
            message: "Mật khẩu không đúng!"
        })
    }

    // tạo token
    const token = jwt.sign({ email: user.email, role: user.role }, "123456", { expiresIn: "1h" });

    user.password = undefined;
    return {
        data: user, token
    }

});