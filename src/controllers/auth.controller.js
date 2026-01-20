import { asyncHandler } from "../utils/asyncHandler";
import bcrypt from "bcryptjs";
import User from '../models/user.model'

export const register = asyncHandler(async (req, res) => {
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
export const login = asyncHandler(async (req, res) => {

});