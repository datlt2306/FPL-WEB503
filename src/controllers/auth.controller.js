import User from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export const signup = asyncHandler(async (req, res) => {
    // lấy dữ liệu từ client
    const { username, email, password } = req.body;

    // kiểm tra email đã tồn tại chưa
    const userExist = await User.findOne({ email });
    if (userExist) {
        return res.status(400).json({
            message: "Email đã tồn tại"
        })
    }
    // mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);
    // lưu vào cơ sở dữ liệu
    const user = await User.create({ username, email, password: hashedPassword });
    user.password = undefined;
    return user;
})

export const signin = asyncHandler(async (req, res) => {
    /**
     * Lấy email và password từ req.body
    Tìm user theo email bằng User.findOne({ email })
    Kiểm tra user có tồn tại không, nếu không trả về 401 với message "Email hoặc mật khẩu không đúng"
    So sánh password với bcrypt.compare(password, user.password)
    Nếu password không khớp, trả về 401 với message "Email hoặc mật khẩu không đúng"
    Tạo JWT token với jwt.sign() chứa userId (hoặc user._id), expire time (ví dụ: 24h)
    Xóa password khỏi user object (user.password = undefined)
    Trả về response với token và user info
     * 
     */

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({
            message: "Email hoặc mật khẩu không đúng"
        })
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
        return res.status(401).json({
            message: "Email hoặc mật khẩu không đúng"
        })
    }

    const token = jwt.sign({ userId: user._id }, "123456", { expiresIn: "1h" });
    user.password = undefined;
    return {
        data: user,
        token
    }
})