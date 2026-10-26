const trips = [
    {
        id: 1,
        destination: "Cairo",
        country: "Egypt",
        cost: 300
    },
    {
        id: 2,
        destination: "Paris",
        country: "France",
        cost: 500
    },
    {
        id: 3,
        destination: "Rome",
        country: "Italy",
        cost: 400
    }
];

let nextId = 4;

function createTrip(destination, country, cost) {
    const trip = {
        id: nextId++,
        destination: destination,
        country: country,
        cost: cost
    };

    trips.push(trip);

    return trip;
}

module.exports = { trips, createTrip };