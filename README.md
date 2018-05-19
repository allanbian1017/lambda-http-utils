# lambda-http-utils

[![Build Status](https://travis-ci.org/allanbian1017/lambda-http-utils.svg?branch=master)](https://travis-ci.org/allanbian1017/lambda-http-utils)
[![View on NPM](https://img.shields.io/npm/v/lambda-http-utils.svg)](https://www.npmjs.com/package/lambda-http-utils)
[![View on NPM](https://img.shields.io/npm/dm/lambda-http-utils.svg)](https://www.npmjs.com/package/lambda-http-utils)
[![codecov](https://codecov.io/gh/allanbian1017/lambda-http-utils/branch/master/graph/badge.svg)](https://codecov.io/gh/allanbian1017/lambda-http-utils)

_lambda-http-utils_ is a utility to make it easy to do parameter checking while developing serverless application like AWS Lambda + API Gateway.

## Setup

Install:

```sh
npm install lambda-http-utils --save-dev
```

## Example

```JavaScript
const lambdaUtils = require('lambda-http-utils');

new lambdaUtils.HttpUtils.Builder(headers, body)
      .withHeaderVal('Content-Type', 'application/json')
      .withBody('some_key')
      .build()
      .check()
      .then((data) => {
        // Do something with parsed data...
      })
      .catch((err) => {
        // Something went wrong
      });
```

## License

MIT. See LICENSE for details.
