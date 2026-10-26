const express = require("express");

const router = express.Router();

const verifyAdmin = require("../middleware/verifyAdmin");
const validateTrip = require("../middleware/validateTrip");
const logRequest = require("../middleware/logRequest");

const {
    getAllTrips,
    getTripById,
    addTrip,
    updateTrip,
    deleteTrip,
    compareTrips
} = require("../controllers/tripController");


// Log every request to the Trips router
router.use(logRequest);


// GET: anyone can retrieve trips
router.get("/", getAllTrips);

router.get("/:id", getTripById);


// POST: only admin can create trips
router.post("/", verifyAdmin, validateTrip, addTrip);


// PUT: only admin can update trips
router.put("/:id", verifyAdmin, updateTrip);


// DELETE: only admin can delete trips
router.delete("/:id", verifyAdmin, deleteTrip);


// POST: anyone can compare trips
router.post("/compare", compareTrips);


module.exports = router;