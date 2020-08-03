module.exports = {
    "connectionString":  "mongodb://heroku_6jczhv4g:312nklhmhc632gj4j875cug1pt@ds033113.mlab.com:33113/heroku_6jczhv4g" || process.env.connectionString ||  "mongodb://localhost:27017/meanie",
    "secret": process.env.secret ||  "REPLACE THIS WITH YOUR OWN SECRET, IT CAN BE ANY STRING",
    "contactEmail": process.env.contactEmail || "REPLACE THIS WITH YOUR EMAIL ADDRESS",
    "googleAnalyticsAccount": process.env.contactEmail || "UA-XXXXXXXX-X",
    "installed" : true
}