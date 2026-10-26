const { trips, createTrip } = require("../models/Trip");


// 1. GET all trips
function getAllTrips(req, res) {

    return res.status(200).json(trips);
}


// 2. GET trip by ID
function getTripById(req, res) {

    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "Invalid trip ID"
        });
    }

    for (let i = 0; i < trips.length; i++) {

        if (trips[i].id === id) {
            return res.status(200).json(trips[i]);
        }
    }

    return res.status(404).json({
        message: "Trip not found"
    });
}


// 3. POST create a new trip
function addTrip(req, res) {

    const { destination, country, cost } = req.body;

    const newTrip = createTrip(
        destination,
        country,
        cost
    );

    return res.status(201).json(newTrip);
}


// 4. PUT update a trip
function updateTrip(req, res) {

    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "Invalid trip ID"
        });
    }

    const { destination, country, cost } = req.body || {};

    if (
        typeof destination !== "string" ||
        destination.trim() === ""
    ) {
        return res.status(400).json({
            message: "Valid destination is required"
        });
    }

    if (
        country !== undefined &&
        (typeof country !== "string" || country.trim() === "")
    ) {
        return res.status(400).json({
            message: "Invalid country"
        });
    }

    if (
        cost !== undefined &&
        (typeof cost !== "number" ||
         !Number.isFinite(cost) ||
         cost <= 0)
    ) {
        return res.status(400).json({
            message: "Invalid cost"
        });
    }

    for (let i = 0; i < trips.length; i++) {

        if (trips[i].id === id) {

            trips[i].destination = destination.trim();

            if (country !== undefined) {
                trips[i].country = country.trim();
            }

            if (cost !== undefined) {
                trips[i].cost = cost;
            }

            return res.status(200).json(trips[i]);
        }
    }

    return res.status(404).json({
        message: "Trip not found"
    });
}


// 5. DELETE a trip
function deleteTrip(req, res) {

    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "Invalid trip ID"
        });
    }

    for (let i = 0; i < trips.length; i++) {

        if (trips[i].id === id) {

            trips.splice(i, 1);

            return res.status(204).send();
        }
    }

    return res.status(404).json({
        message: "Trip not found"
    });
}


// 6. POST compare two trips
function compareTrips(req, res) {

    const { tripId1, tripId2 } = req.body || {};

    // Validate both IDs
    if (
        !Number.isSafeInteger(tripId1) ||
        !Number.isSafeInteger(tripId2) ||
        tripId1 <= 0 ||
        tripId2 <= 0 ||
        tripId1 === tripId2
    ) {
        return res.status(400).json({
            message: "Provide two different positive integer trip IDs"
        });
    }

    let trip1 = null;
    let trip2 = null;

    // Find both trips using a for loop
    for (let i = 0; i < trips.length; i++) {

        if (trips[i].id === tripId1) {
            trip1 = trips[i];
        }

        if (trips[i].id === tripId2) {
            trip2 = trips[i];
        }
    }

    if (trip1 === null || trip2 === null) {
        return res.status(404).json({
            message: "One or both trips not found"
        });
    }

    const costDifference = Math.abs(trip1.cost - trip2.cost);

    let cheaperDestination;

    if (trip1.cost < trip2.cost) {
        cheaperDestination = trip1.destination;
    } else if (trip2.cost < trip1.cost) {
        cheaperDestination = trip2.destination;
    } else {
        cheaperDestination = null;
    }

    return res.status(200).json({
        destination1: trip1.destination,
        destination2: trip2.destination,
        costDifference: costDifference,
        cheaperDestination: cheaperDestination,
        message: cheaperDestination === null
            ? "Neither trip is cheaper; both have equal costs"
            : `${cheaperDestination} is cheaper`
    });
}


module.exports = {
    getAllTrips,
    getTripById,
    addTrip,
    updateTrip,
    deleteTrip,
    compareTrips
};