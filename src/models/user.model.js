import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        phone: {
            type: String,
            required: [true, "Vui lòng cung cấp số điện thoại"],
            unique: true,
            validate: {
                validator: (v) => /^\d{10}$/.test(v),
                message: (props) => `${props.value} không phải là số điện thoại hợp lệ!`,
            },
        },
        email: {
            type: String,
            lowercase: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Vui lòng cung cấp địa chỉ email hợp lệ",
            ],
        },
        fullName: {
            type: String,
            required: [true, "Vui lòng cung cấp họ tên"],
            trim: true,
        },
        dateOfBirth: {
            type: Date,
            validate: {
                validator: function (date) {
                    return date < new Date();
                },
                message: "Ngày sinh không thể là ngày trong tương lai",
            },
        },
        password: {
            type: String,
            required: [true, "Vui lòng cung cấp mật khẩu"],
            minlength: [6, "Mật khẩu phải có ít nhất 6 ký tự"],
            select: false, // Không trả về password trong query
        },
        passwordChangedAt: Date,
        role: {
            type: String,
            enum: ["customer", "staff", "admin"],
            default: "customer",
        },
        preferences: {
            preferredStylist: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Stylist",
            },
            notes: {
                type: String,
                maxlength: [500, "Ghi chú không được vượt quá 500 ký tự"],
            },
        },
        loyaltyPoints: {
            type: Number,
            default: 0,
            min: [0, "Điểm tích lũy không thể âm"],
        },
        addresses: [
            {
                street: String,
                city: String,
                isDefault: {
                    type: Boolean,
                    default: false,
                },
            },
        ],
        avatar: String,
        active: {
            type: Boolean,
            default: true,
            select: false,
        },
    },
    {
        timestamps: true, // Tự động thêm createdAt và updatedAt
        versionKey: false, // Loại bỏ __v
    }
);

const User = mongoose.model("User", userSchema);

export default User;
