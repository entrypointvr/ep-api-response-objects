const httpErrors = require('http-errors')

// Add all of the default http error codes from the express http-errors library
const lambda = Object.keys(httpErrors).reduce((acc, func) => {
  acc[func] = (msg) => {
    let error = httpErrors[func](msg)
    return {
      statusCode: error.statusCode,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: typeof error !== "string" ? JSON.stringify(error) : error
    }
  }
  return acc
}, {})

//For lambdas, responding with an OK is enough of a pain that we also support responding with an OK as well
lambda['OK'] = lambda[200] = (body) => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: typeof body !== "string" ? JSON.stringify(body) : body
  }
}

//Responding with a redirect for lambdas is also a pain, so we add support for these codes
const lambdaRedirect = (code) => (location) => {
    return {
      statusCode: code,
      headers: {
        'Location': location,
        'Access-Control-Allow-Origin': '*',
      }
  }
}

lambda['MovedPermanently'] = lambda[301] = lambdaRedirect(301)
lambda['Found'] = lambda[302] = lambdaRedirect(302)

module.exports = {
  lambda: lambda,
  standard: httpErrors
}