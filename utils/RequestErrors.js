// The error returned by this function is handled in the error handler middleware in app.js.
const NotFound = StatusCodeError(404);
const BadRequest = StatusCodeError(400);

function StatusCodeError(statusCode) {
  console.log(`creates error ${statusCode}`);
  return Object.assign(new Error(), {
    statusCode
  });
}

export { NotFound, BadRequest };
