package com.ssafy.airlingo.global.exception;

public class ExistEmailException extends RuntimeException{
    public ExistEmailException() {
        super(ExceptionCode.EXIST_EMAIL_EXCEPTION.getErrorMessage());
    }
    public ExistEmailException(String message) {
        super(message);
    }
}
