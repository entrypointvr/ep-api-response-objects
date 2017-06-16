const apiResponse = require('../index');

test('create basic error', () => {
  expect(apiResponse.error.NotFound().message).toBe('Not Found')
});

test('create lambda error', () => {
  expect(apiResponse.lambdaError.NotFound().statusCode).toBe(404)
  expect(apiResponse.lambdaError.NotFound("Invalid endpoint").body.indexOf("Invalid endpoint")).not.toBe(-1)
});