const httpErrors = require('http-errors')

/**
 * Convenience function to help with generating lambda response objects
 * @param code - the http status code
 * @param body - the body to return
 * @param additionalHeaders - additional headers if required
 * @returns {{statusCode: *, headers: *, body: *}}
 */
const generateLambdaResponse = (code, body, additionalHeaders = {}) => {
  let preparedBody;
  if (body) {
    if (typeof body !== 'string') {
      preparedBody = JSON.stringify(body)
    } else {
      Object.assign(additionalHeaders, {'Content-Type': 'text/html'})
      preparedBody = body
    }
  }
  return {
    statusCode: code,
    headers: Object.assign({
      'Access-Control-Allow-Origin': '*',
    }, additionalHeaders),
    body: preparedBody
  }
}

// Add all of the default http error codes from the express http-errors library
const lambda = Object.keys(httpErrors).reduce((acc, func) => {
  acc[func] = (msg) => {
    let error = httpErrors[func](msg)
    return generateLambdaResponse(error.statusCode, error)
  }
  return acc
}, {})

//For lambdas, responding with an OK is enough of a pain that we also support responding with an OK as well
lambda['OK'] = lambda[200] = (body) => generateLambdaResponse(200, body)

//Responding with a redirect for lambdas is also a pain, so we add support for these codes
const lambdaRedirect = (code) => (location) => generateLambdaResponse(code, undefined, { 'Location': location })

lambda['MovedPermanently'] = lambda[301] = lambdaRedirect(301)
lambda['Found'] = lambda[302] = lambdaRedirect(302)

module.exports = {
  lambda: lambda,
  standard: httpErrors
}