'use strict';

const Errors = require('./Errors');

/**
 * HttpUtils Class
 *
 * @class HttpUtils
 */
class HttpUtils {
  /**
   * Creates an instance of HttpUtils.
   * @param {Object} options
   * @memberof HttpUtils
   */
  constructor(options) {
    this.hdr = options.hdr;
    this.body = options.body;
    this.path = options.path;
    this.query = options.query;

    this.hdrChkList = options.hdrChkList;
    this.bodyChkList = options.bodyChkList;
    this.pathChkList = options.pathChkList;
    this.queryChkList = options.queryChkList;
  }

  /**
   * Get builder.
   *
   * @memberof HttpUtils
   */
  static get Builder() {
    /**
     * Builder Class
     *
     * @class Builder
     */
    class Builder {
      /**
       * Creates an instance of Builder.
       * @param {Object} hdr Http headers.
       * @param {String} body Http body.
       * @param {Object} path Http path.
       * @param {Object} query Http query parameters.
       * @memberof Builder
       */
      constructor(hdr, body, path, query) {
        this.hdr = hdr;
        this.body = {};
        this.path = path;
        this.query = query;

        if (this.hdr['Content-Type'] === 'application/json') {
          try {
            this.body = JSON.parse(body);
          } catch (e) {
            this.body = {};
          }
        }

        this.hdrChkList = [];
        this.bodyChkList = [];
        this.pathChkList = [];
        this.queryChkList = [];
      }

      /**
       * Check header with value.
       *
       * @param {String} key
       * @param {String} val
       * @return {HttpUtils}
       * @memberof HttpUtils
       */
      withHeaderVal(key, val) {
        let obj = {
          key: key,
          val: val,
        };
        this.hdrChkList.push(obj);
        return this;
      }

      /**
       * Check body with key.
       *
       * @param {String} key
       * @return {HttpUtils}
       * @memberof HttpUtils
       */
      withBody(key) {
        this.bodyChkList.push(key);
        return this;
      }

      /**
       * Check path with key.
       *
       * @param {String} key
       * @return {HttpUtils}
       * @memberof HttpUtils
       */
      withPath(key) {
        this.pathChkList.push(key);
        return this;
      }

      /**
       * Check query with key.
       *
       * @param {String} key
       * @return {HttpUtils}
       * @memberof HttpUtils
       */
      withQuery(key) {
        this.queryChkList.push(key);
        return this;
      }

      /**
       * Build HttpUtils.
       *
       * @return {HttpUtils}
       * @memberof Builder
       */
      build() {
        return new HttpUtils(this);
      }
    }
    return Builder;
  }

  /**
   * Check parameter.
   *
   * @return {Promise}
   * @memberof HttpUtils
   */
  check() {
    let data = {
      hdr: this.hdr,
      body: this.body,
      path: this.path,
      query: this.query,
    };
    let isFulfill = true;

    isFulfill = this.hdrChkList.every((x) => {
      return data.hdr[x.key] && data.hdr[x.key] === x.val;
    });

    isFulfill &= this.bodyChkList.every((x) => {
      if (data.body.hasOwnProperty(x)) {
        if (typeof data.body[x] === 'string' && !data.body[x]) {
          return false;
        } else {
          return true;
        }
      }

      return false;
    });

    isFulfill &= this.pathChkList.every((x) => {
      return data.path.hasOwnProperty(x);
    });

    isFulfill &= this.queryChkList.every((x) => {
      return data.query.hasOwnProperty(x);
    });

    if (!isFulfill) {
      return Promise.reject(new Errors.BadRequestError('Bad request'));
    }

    return Promise.resolve(data);
  }
}

module.exports = HttpUtils;
