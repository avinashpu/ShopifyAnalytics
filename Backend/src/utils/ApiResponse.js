const { Response } = require('express');

class APIResponse {
    successResponse(res, msg = "Success", data) {
        const resData = {
            success: true,
            message: msg,
        };
        if (data) resData.data = data;
        res.status(200).json(resData);
    }

    createdResponse(res, msg = "Created", data) {
        const resData = {
            success: true,
            message: msg,
        };
        if (data) resData.data = data;
        res.status(201).json(resData);
    }

    noContentResponse(res, msg = "Success") {
        const resData = {
            success: true,
            message: msg,
        };
        res.status(204).json(resData);
    }

    validationErrorResponse(res, msg = "Validation Error", data) {
        const resData = {
            success: false,
            message: msg,
        };
        if (data) resData.data = data;
        res.status(400).json(resData);
    }

    unauthorizedResponse(res, msg = "Unauthorized") {
        const resData = {
            success: false,
            message: msg,
        };
        res.status(401).json(resData);
    }

    forbiddenResponse(res, msg = "Forbidden") {
        const resData = {
            success: false,
            message: msg,
        };
        res.status(403).json(resData);
    }

    notFoundResponse(res, msg = "Not Found") {
        const resData = {
            success: false,
            message: msg,
        };
        res.status(404).json(resData);
    }

    rateLimitResponse(res, msg = "Rate Limit Exceeded") {
        const resData = {
            success: false,
            message: msg,
        };
        res.status(429).json(resData);
    }

    errorResponse(res, msg = "Something went wrong") {
        const resData = {
            success: false,
            message: msg,
        };
        res.status(500).json(resData);
    }
}

module.exports = new APIResponse();
