// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ==============================================================================

var peopleData = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET ---------------------------------------------------------------------------

    app.get("/api/friends", function (req, res) {
        res.json(peopleData);
    });

    // API POST ---------------------------------------------------------------------------

    app.post("/api/friends", function (req, res) {

        var smallestDifference = 250;

        var bestMatch;

        for (i = 0; i < peopleData.length; i++) {
            var totalDifference = 0;
            for (j = 0; j < 10; j++) {
                totalDifference += Math.abs((req.body.scores[j]) - (peopleData[i].scores[j]));
            }

            if (totalDifference < smallestDifference) {
                smallestDifference = totalDifference;
                bestMatch = peopleData[i];
            }
        }

        peopleData.push(req.body);

        res.json(bestMatch);

    });
};
