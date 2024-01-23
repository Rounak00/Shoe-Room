
class customErrorHandler extends Error {
    constructor(status, msg) {
        super();
        this.status = status;
        this.message = msg;
    }
    // static alreadyExist(message: string) {
    //     return new CustomErrorHandler(409, message);
    // }

   
}

module.exports= customErrorHandler;