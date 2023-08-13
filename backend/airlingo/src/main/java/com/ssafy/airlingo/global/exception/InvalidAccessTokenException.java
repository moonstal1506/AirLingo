package com.ssafy.airlingo.global.exception;

public class InvalidAccessTokenException extends RuntimeException {
	public InvalidAccessTokenException() {
		super(ExceptionCode.EXPIRED_REFRESH_TOKEN_EXCEPTION.getErrorMessage());
	}

	public InvalidAccessTokenException(String message) {
		super(message);
	}
}
