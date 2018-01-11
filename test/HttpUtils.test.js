'use strict';

const HttpUtils = require('../lib/HttpUtils');
const Errors = require('../lib/Errors');
const expect = require('chai').expect;

describe('HttpUtils', () => {
  it('should pass check', () => {
    const testHeader = {
      'Content-Type': 'application/json',
    };
    const testBody = '{\n\t"device_id": 123,\n\t"device_name": "hello"\n}';

    return new HttpUtils.Builder(testHeader, testBody)
      .withHeaderVal('Content-Type', 'application/json')
      .withBody('device_id')
      .withBody('device_name')
      .build()
      .check()
      .then((data) => {
        expect(data.body.device_id).to.equal(123);
        expect(data.body.device_name).to.equal('hello');
        return Promise.resolve();
      });
  });

  it('should throws BadRequestError', () => {
    const testHeader = {
      'Content-Type': 'application/json',
    };
    const testBody = '{\n\t"device_id": 123,\n\t"device_name": "hello"\n}';

    return new HttpUtils.Builder(testHeader, testBody)
      .withHeaderVal('Content-Type', 'application/json')
      .withBody('device_type')
      .build()
      .check()
      .then(() => {
        return Promise.reject(new Error('Does not throws BadRequestError'));
      })
      .catch((err) => {
        if (err instanceof Errors.BadRequestError) {
          return Promise.resolve();
        }

        return Promise.reject(new Error('Does not throws BadRequestError'));
      });
  });
});
