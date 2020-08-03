module.exports = {
    "connectionString":  process.env.connectionString ||  "mongodb://localhost:27017/meanie",
    "secret": process.env.secret ||  "REPLACE THIS WITH YOUR OWN SECRET, IT CAN BE ANY STRING",
    "contactEmail": process.env.contactEmail || "REPLACE THIS WITH YOUR EMAIL ADDRESS",
    "googleAnalyticsAccount": process.env.contactEmail || "UA-XXXXXXXX-X",
    "installed" : true
}