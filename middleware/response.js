module.exports = {
    responseData: (res, status, message, data) => {
        return res.status(status).json({
            total: data.length ? data.length : 0,
            status: status,
            message: message,
            data: data
        });
    },
    responseError: (res, status, message, data) => {
        return res.status(status).json({
            status: status,
            message: message
        });
    },
}