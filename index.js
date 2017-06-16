const httpErrors = require('http-errors')

module.exports = {
  lambdaError: Object.keys(httpErrors).reduce((acc, func) => {
    acc[func] = (msg) => {
      let error = httpErrors[func](msg)
      return {
        statusCode: error.statusCode,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(error)
      }
    }
    return acc
  }, {}),
  error: httpErrors
}