import slack from './slack';
class ErrorHandler extends Error {
    statusCode : number;
    message : string;
    constructor(statusCode, message) {
      super();
      this.statusCode = statusCode;
      this.message = message;
    }

  }

const handleError = (err, res) => {
    const { statusCode, message } = err;
    slack.alert({
        text: message
    });
    res.status(statusCode).json({
        status: "error",
        statusCode,
        message
    });
};

export { ErrorHandler,handleError};
