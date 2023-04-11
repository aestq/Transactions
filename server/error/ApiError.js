class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }

  static badRequest(message) {
    return new ApiError(message, 400)
  }

  static unauthorized() {
    return new ApiError('Не авторизован', 401)
  }

  static internalServerError(message) {
    return new ApiError(message, 500)
  }
}

export default ApiError