const asyncWrapper = (fn) =>{
    return async (req, res, next) =>{
        try{
            await fn(req, res, next)
        } catch(error){
            next(error)//Passing this error to next middle ware which will be setuped in app.js
        }
    }
}

module.exports = asyncWrapper