import { Router } from "express";
import {
    createEvent,
    deleteEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    validateEventData,
    validateEventId,
    validateQueryParams,
} from "../controllers/event";

const router = Router();

// Apply validation middleware to routes
router.get("/", validateQueryParams, getAllEvents);
router.get("/:id", validateEventId, getEventById);
router.post("/", validateEventData, createEvent);
router.put("/:id", validateEventId, validateEventData, updateEvent);
router.delete("/:id", validateEventId, deleteEvent);

export default router;
