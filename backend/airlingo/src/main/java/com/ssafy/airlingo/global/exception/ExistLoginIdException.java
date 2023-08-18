package com.ssafy.airlingo.global.exception;

public class ExistLoginIdException extends RuntimeException{
    public ExistLoginIdException() {
        super(ExceptionCode.EXIST_LOGINID_EXCEPTION.getErrorMessage());
    }
    public ExistLoginIdException(String message) {
        super(message);
    }
}
