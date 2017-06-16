const apiResponse = require('../index');

test('create basic error', () => {
  expect(apiResponse.standard.NotFound().message).toBe('Not Found')
});

test('create lambda error', () => {
  expect(apiResponse.lambda.NotFound().statusCode).toBe(404)
  expect(apiResponse.lambda.NotFound("Invalid endpoint").body.indexOf("Invalid endpoint")).not.toBe(-1)
});

test('create lambda OK', () => {
  expect(apiResponse.lambda.OK().statusCode).toBe(200)
  expect(apiResponse.lambda.OK("success").body).toBe("\"success\"")
  expect(apiResponse.lambda.OK({"test": "test"}).body).toBe("{\"test\":\"test\"}")
});