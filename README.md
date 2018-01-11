# lambda-http-utils

_lambda-http-utils_ is a utility to make it easy to do parameter checking while developing serverless application like AWS Lambda + API Gateway.

## Setup

Install:

```
$ npm install lambda-http-utils --save-dev
```

## Example

```JavaScript
const lambdaUtils = require('lambda-http-utils');

new lambdaUtils.HttpUtils.Builder(headers, body)
      .withHeaderVal('Content-Type', 'application/json')
      .withBody('some_key')
      .build()
      .execute()
      .then((data) => {
        // Do something with parsed data...
      })
      .catch((err) => {
        // Something went wrong
      });
```

## License

MIT. See LICENSE for details.
