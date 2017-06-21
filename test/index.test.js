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
  expect(apiResponse.lambda.OK({"test": "success"}).body).toBe("{\"test\":\"success\"}")
  expect(apiResponse.lambda.OK({"test": "test"}).body).toBe("{\"test\":\"test\"}")
});

test('create lambda html', () => {
  expect(apiResponse.lambda.OK("<html>").body).toBe("<html>")
  expect(apiResponse.lambda.OK("<html>").headers["Content-Type"]).toBe("text/html")
})

test('create lambda redirect', () => {
  expect(apiResponse.lambda.Found("https://example.com").statusCode).toBe(302)
  expect(apiResponse.lambda.Found("https://example.com").headers["Location"]).toBe("https://example.com")
});