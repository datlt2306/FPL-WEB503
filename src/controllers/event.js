import Event from "../models/events";
import Joi from "joi";
const eventSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    author: Joi.string().required(),
});
export const getAllEvents = async (req, res) => {
    const { _page = 1, _limit = 10 } = req.query;
    const options = {
        page: _page,
        limit: _limit,
        sort: { price: -1 },
    };
    try {
        const events = await Event.paginate({}, options);
        return res.json(events);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        return res.json(event);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createEvent = async (req, res) => {
    try {
        const { error } = eventSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details.map((error) => error.message),
            });
        }
        const event = await Event.create(req.body);
        return res.status(201).json(event);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateEvent = async (req, res) => {
    try {
        const { error } = eventSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details.map((error) => error.message),
            });
        }
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json(event);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        return res.json(event);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
