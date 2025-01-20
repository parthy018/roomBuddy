const asyncHandler = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next)
    } catch (error) {
      console.log(error)
      if (!error.statusCode) {
        return res.status(404).json({ success: false, error: error.message })
      }
      res.status(error.statusCode).json({ success: false, error: error.message })
    }
  }
}



export default asyncHandler;
