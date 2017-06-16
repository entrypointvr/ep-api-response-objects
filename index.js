const httpErrors = require('http-errors')

const lambda = Object.keys(httpErrors).reduce((acc, func) => {
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
}, {})

lambda['OK'] = lambda[200] = (body) => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(body)
  }
}

module.exports = {
  lambda: lambda,
  standard: httpErrors
}