package com.ssafy.airlingo.global.exception;

public class ExistNicknameException extends RuntimeException{
    public ExistNicknameException() {
        super(ExceptionCode.EXIST_NICKNAME_EXCEPTION.getErrorMessage());
    }
    public ExistNicknameException(String message) {
        super(message);
    }
}
