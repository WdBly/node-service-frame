
module.exports = {
    "process.env": {
        NODE_ENV:JSON.stringify(process.env.NODE_ENV || "development"),
        API_ROOT:"'http://127.0.0.1:5000'"
    }
};