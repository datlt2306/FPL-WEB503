import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', (req, res) => {
    console.log(req.query._limit);
    return res.json({
        message: "Danh sách user!"
    })
});
userRouter.get('/:id', (req, res) => {
    console.log(req.params.id);
    return res.json({
        message: `Thông tin người dùng ID: ${req.params.id}`
    })
});
userRouter.post('/', (req, res) => {
    const isAdmin = false
    if (!isAdmin) return res.status(401).json({
        message: "Bạn không có quyền tạo người dùng"
    })
    try {
        return res.status(201).json({
            message: "Tạo người dùng mới", data: req.body
        })
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi server"
        })
    }

});

export default userRouter;