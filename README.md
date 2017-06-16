# ep-api-response-objects

## Installation
1. Add `git+ssh://github.com/entrypointvr/ep-api-response-objects.git#VERISON` to your package.json
1. `const apiResponses = require('ep-api-response-objects')`

## Usage

This library relies heavily on [http-errors](https://github.com/jshttp/http-errors) and exposes all of the same
functions for errors.

After installing the library create errors using either:

`apiResponses.error.NotFound()`

See the full list of supported names in [http-errors](https://github.com/jshttp/http-errors) README.

When using with lambdas, the library exposes a convenience wrapper to support lambda proxies. Use it with:

`apiResponses.lambdaError.NotFound()`

The library also supports an OK method for lambdas which takes a body:

`apiResponses.lambdaError.OK({"test": "test response")`