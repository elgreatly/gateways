import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, Logger } from '@nestjs/common';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse();
        const status = exception.getStatus();
        Logger.log(exception);
        let errors = [];
        if (Array.isArray(exception.message.message)) {
            errors = exception.message.message.map(err => {
                return this.validateErrors(err);
            });
        }
        response.status(status).json({
            status,
            message: Array.isArray(exception.message.message) ? exception.message.error : exception.message.message,
            errors,
        });
    }

    validateErrors(err) {
        if (err.children.length === 0) {
            const errorMessages = [];
            Object.keys(err.constraints).forEach((key: string) => {
                const message = err.constraints[key];
                errorMessages.push(message);
            });
            return {
                field: err.property,
                message: errorMessages,
            };
        } else {
            const errors = [];
            err.children.forEach((childrenError: any) => {
                errors.push(this.validateErrors(childrenError).message);
            });
            return {
                field: err.property,
                message: errors,
            };
        }
    }
}
