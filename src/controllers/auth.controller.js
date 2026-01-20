import User from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";
import bcrypt from "bcryptjs";

export const register = asyncHandler(async (req, res) => {
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

export const login = asyncHandler(async (req, res) => {

})