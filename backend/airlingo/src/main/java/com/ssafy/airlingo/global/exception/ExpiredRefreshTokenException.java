package com.ssafy.airlingo.global.exception;

public class ExpiredRefreshTokenException extends RuntimeException {
    public ExpiredRefreshTokenException() {
        super(ExceptionCode.EXPIRED_REFRESH_TOKEN_EXCEPTION.getErrorMessage());
    }

    public ExpiredRefreshTokenException(String message) {
        super(message);
    }
}
