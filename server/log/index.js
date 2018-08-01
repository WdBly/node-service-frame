import log4js from "log4js";

import logConf from "./log.config.json";

log4js.configure(logConf);

const errorLog = log4js.getLogger("errorLog");
var logInfo = log4js.getLogger("successLog");

const error = msg => {
    errorLog.error(msg);
};

const info = msg => {
    logInfo.info(msg);
};

module.exports = {
    error,
    info
};
