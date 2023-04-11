import ApiError from "../error/ApiError.js";
import tokenService from '../user/token.service.js';

function authMiddleware(request, response, next) {
  try {
    const authHeader = request.headers.authorization
    if(!authHeader) {
      return next(ApiError.unauthorized())
    }
    const token = authHeader.split(' ')[1]
    if(!token) {
      return next(ApiError.unauthorized())
    }

    const userData = tokenService.validateAccessToken(token)
    if(!userData) {
      return next(ApiError.unauthorized())
    }
  
    request.user = userData
    next()
  } catch (error) {
    return next(ApiError.unauthorized())
  }
}

export default authMiddleware