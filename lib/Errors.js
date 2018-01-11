'use strict';

/**
 * ExtendableError Class.
 *
 * @class ExtendableError
 * @extends {Error}
 */
class ExtendableError extends Error {
  /**
   * Creates an instance of ExtendableError.
   * @param {String} message
   * @memberof ExtendableError
   */
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }
}

/**
 * BadRequestError Class.
 *
 * @class BadRequestError
 * @extends {ExtendableError}
 */
class BadRequestError extends ExtendableError {}

module.exports = {
  BadRequestError: BadRequestError,
};
