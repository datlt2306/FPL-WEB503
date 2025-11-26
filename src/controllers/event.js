import Event from "../models/events";
import Joi from "joi";
import mongoose from "mongoose";

// Constants
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;

// Validation schemas
const eventSchema = Joi.object({
    title: Joi.string().trim().min(1).max(200).required().messages({
        "string.empty": "Tiêu đề không được để trống",
        "string.min": "Tiêu đề phải có ít nhất 1 ký tự",
        "string.max": "Tiêu đề không được vượt quá 200 ký tự",
        "any.required": "Tiêu đề là bắt buộc",
    }),
    content: Joi.string().trim().min(1).max(5000).required().messages({
        "string.empty": "Nội dung không được để trống",
        "string.min": "Nội dung phải có ít nhất 1 ký tự",
        "string.max": "Nội dung không được vượt quá 5000 ký tự",
        "any.required": "Nội dung là bắt buộc",
    }),
    author: Joi.string().trim().min(1).max(100).required().messages({
        "string.empty": "Tác giả không được để trống",
        "string.min": "Tác giả phải có ít nhất 1 ký tự",
        "string.max": "Tác giả không được vượt quá 100 ký tự",
        "any.required": "Tác giả là bắt buộc",
    }),
});

const idSchema = Joi.object({
    id: Joi.string()
        .custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                return helpers.error("any.invalid");
            }
            return value;
        })
        .required()
        .messages({
            "any.invalid": "ID không hợp lệ",
            "any.required": "ID là bắt buộc",
        }),
});

const querySchema = Joi.object({
    _page: Joi.number().integer().min(1).default(DEFAULT_PAGE),
    _limit: Joi.number().integer().min(1).max(MAX_LIMIT).default(DEFAULT_LIMIT),
});

// Validation middleware functions
export const validateEventData = (req, res, next) => {
    const { error, value } = eventSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: "Dữ liệu không hợp lệ",
            errors: error.details.map((detail) => detail.message),
        });
    }
    req.validatedData = value;
    next();
};

export const validateEventId = (req, res, next) => {
    const { error } = idSchema.validate({ id: req.params.id });
    if (error) {
        return res.status(400).json({
            success: false,
            message: "ID không hợp lệ",
            errors: error.details.map((detail) => detail.message),
        });
    }
    next();
};

export const validateQueryParams = (req, res, next) => {
    const { error, value } = querySchema.validate(req.query);
    if (error) {
        return res.status(400).json({
            success: false,
            message: "Tham số truy vấn không hợp lệ",
            errors: error.details.map((detail) => detail.message),
        });
    }
    req.validatedQuery = value;
    next();
};
export const getAllEvents = async (req, res) => {
    try {
        const { _page, _limit } = req.validatedQuery;
        const options = {
            page: _page,
            limit: _limit,
            sort: { createdAt: -1 }, // Sort by creation date instead of price
            select: "title content author createdAt updatedAt", // Only select needed fields
        };

        const events = await Event.paginate({}, options);

        return res.json({
            success: true,
            data: events.docs,
            pagination: {
                currentPage: events.page,
                totalPages: events.totalPages,
                totalItems: events.totalDocs,
                itemsPerPage: events.limit,
                hasNextPage: events.hasNextPage,
                hasPrevPage: events.hasPrevPage,
            },
        });
    } catch (error) {
        console.error("Error in getAllEvents:", error);
        return res.status(500).json({
            success: false,
            message: "Lỗi server khi lấy danh sách sự kiện",
            error: process.env.NODE_ENV === "development" ? error.message : "Lỗi nội bộ server",
        });
    }
};
export const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).select(
            "title content author createdAt updatedAt"
        );

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy sự kiện với ID này",
            });
        }

        return res.json({
            success: true,
            data: event,
        });
    } catch (error) {
        console.error("Error in getEventById:", error);
        return res.status(500).json({
            success: false,
            message: "Lỗi server khi lấy thông tin sự kiện",
            error: process.env.NODE_ENV === "development" ? error.message : "Lỗi nội bộ server",
        });
    }
};

export const createEvent = async (req, res) => {
    try {
        const value = req.validatedData;

        // Check for duplicate title
        const existingEvent = await Event.findOne({
            title: { $regex: new RegExp(`^${value.title}$`, "i") },
        });

        if (existingEvent) {
            return res.status(409).json({
                success: false,
                message: "Sự kiện với tiêu đề này đã tồn tại",
            });
        }

        const event = await Event.create(value);

        return res.status(201).json({
            success: true,
            message: "Tạo sự kiện thành công",
            data: event,
        });
    } catch (error) {
        console.error("Error in createEvent:", error);

        // Handle duplicate key error
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Sự kiện với tiêu đề này đã tồn tại",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Lỗi server khi tạo sự kiện",
            error: process.env.NODE_ENV === "development" ? error.message : "Lỗi nội bộ server",
        });
    }
};

export const updateEvent = async (req, res) => {
    try {
        const value = req.validatedData;

        // Check if event exists
        const existingEvent = await Event.findById(req.params.id);
        if (!existingEvent) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy sự kiện với ID này",
            });
        }

        // Check for duplicate title (excluding current event)
        const duplicateEvent = await Event.findOne({
            title: { $regex: new RegExp(`^${value.title}$`, "i") },
            _id: { $ne: req.params.id },
        });

        if (duplicateEvent) {
            return res.status(409).json({
                success: false,
                message: "Sự kiện với tiêu đề này đã tồn tại",
            });
        }

        const event = await Event.findByIdAndUpdate(req.params.id, value, {
            new: true,
            runValidators: true,
            select: "title content author createdAt updatedAt",
        });

        return res.json({
            success: true,
            message: "Cập nhật sự kiện thành công",
            data: event,
        });
    } catch (error) {
        console.error("Error in updateEvent:", error);

        // Handle duplicate key error
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Sự kiện với tiêu đề này đã tồn tại",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Lỗi server khi cập nhật sự kiện",
            error: process.env.NODE_ENV === "development" ? error.message : "Lỗi nội bộ server",
        });
    }
};

export const deleteEvent = async (req, res) => {
    try {
        // Check if event exists before deletion
        const existingEvent = await Event.findById(req.params.id);
        if (!existingEvent) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy sự kiện với ID này",
            });
        }

        const event = await Event.findByIdAndDelete(req.params.id);

        return res.json({
            success: true,
            message: "Xóa sự kiện thành công",
            data: {
                id: event._id,
                title: event.title,
            },
        });
    } catch (error) {
        console.error("Error in deleteEvent:", error);
        return res.status(500).json({
            success: false,
            message: "Lỗi server khi xóa sự kiện",
            error: process.env.NODE_ENV === "development" ? error.message : "Lỗi nội bộ server",
        });
    }
};
