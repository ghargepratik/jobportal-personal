const { format, createLogger, transports } = require('winston')
const { combine, label, json, prettyPrint } = format
require('winston-daily-rotate-file')

const CATEGORY = 'Log Rotation'

const fileRotateTransport = new transports.DailyRotateFile({
    filename: 'logs/%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d',
})

const logger = createLogger(
    {
        level: 'debug',
        format: combine(label({ label: CATEGORY }), prettyPrint()),
        transports: [fileRotateTransport, new transports.Console()],
    },
    {
        level: 'error',
        format: combine(label({ label: CATEGORY }), prettyPrint()),
        transports: [fileRotateTransport, new transports.Console()],
    }
)

module.exports = logger
