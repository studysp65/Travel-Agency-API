function validateTrip(req, res, next) {

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
        typeof country !== "string" ||
        country.trim() === ""
    ) {
        return res.status(400).json({
            message: "Valid country is required"
        });
    }

    if (
        typeof cost !== "number" ||
        !Number.isFinite(cost) ||
        cost <= 0
    ) {
        return res.status(400).json({
            message: "Cost must be a number greater than zero"
        });
    }

    req.body.destination = destination.trim();
    req.body.country = country.trim();

    next();
}

module.exports = validateTrip;