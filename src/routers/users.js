import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', (req, res) => {
    return res.json({
        message: "Danh sách user!"
    })
});
userRouter.get('/:id', (req, res) => {
    return res.json({
        message: `Thông tin người dùng ID: ${req.params.id}`
    })
});
userRouter.post('/', (req, res) => {
    return res.json({
        message: "Tạo người dùng mới", data: req.body
    })
});

export default userRouter;