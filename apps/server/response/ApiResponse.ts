/**
 * @desc    This file contains Success and Error response helpers
 * @author  Shriyansh Lohia
 * @since   2025
 *
 */

/**
 * @desc Send any success response
 *
 * @param {Object} res
 * @param {Number} statusCode
 * @param {String} message
 * @param {Object} data
 */

import { Response } from "express";

export const successResponse = (
  res: Response,
  statusCode = 200,
  message = "Success",
  data = {}
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * @desc Send any error response
 *
 * @param {Object} res
 * @param {Number} statusCode
 * @param {String} message
 * @param {Object} errors
 */
export const errorResponse = (
  res: Response,
  statusCode = 500,
  message = "Error",
  errors = {}
) => {
  const validCodes = [200, 201, 400, 401, 403, 404, 422, 500];

  // fallback to 500 if invalid status code provided
  if (!validCodes.includes(statusCode)) {
    statusCode = 500;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

/**
 * @desc Send validation error response
 *
 * @param {Object} res
 * @param {Object|Array} errors
 */
export const validationResponse = (res: Response, errors = {}) => {
  return res.status(422).json({
    success: false,
    message: "Validation Error",
    errors,
  });
};
