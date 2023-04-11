import ApiError from "../error/ApiError.js"

function errorMiddleware(error, request, response, next) {
  console.log(error)
  if(error instanceof ApiError) {
    return response.status(error.status).json({message: error.message})
  }

  const serverError = ApiError.internalServerError('Произошла ошибка сервера')

  return response.status(serverError.status).json({message: serverError.message})
}

export default errorMiddleware