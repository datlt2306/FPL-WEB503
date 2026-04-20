import User from '../models/user.model';
import Joi from 'joi';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const signupSchema = Joi.object({
    username: Joi.string(),
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
    }), password: Joi.string().required(),
});
const signinSchema = Joi.object({
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
    }), password: Joi.string().required(),
})
export const signup = async (req, res) => {
    try {
        const { error } = signupSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map(err => err.message);
            return res.status(400).json(errors)
        }
        const { username, email, password } = req.body;

        const existUser = await User.findOne({ email });
        if (existUser) return res.status(400).json({
            message: "Email đã tồn tại"
        });

        const hashedPassword = await bcryptjs.hash(password, 10);

        const user = await User.create({ username, email, password: hashedPassword })
        user.password = undefined;
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}
export const signin = async (req, res) => {
    try {
        const { error } = signinSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map(err => err.message);
            return res.status(400).json(errors)
        }
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({
            message: "Email không tồn tại"
        });

        const matchPassword = await bcryptjs.compare(password, user.password);
        if (!matchPassword) {
            return res.status(400).json({
                message: "Mật khẩu không đúng"
            })
        };

        const token = jwt.sign({ id: user._id }, "123456", { expiresIn: '1h' });
        user.password = undefined;
        return res.status(201).json({
            token, user
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}