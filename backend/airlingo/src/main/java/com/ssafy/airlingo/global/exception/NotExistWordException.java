package com.ssafy.airlingo.global.exception;

public class NotExistWordException extends RuntimeException {
	public NotExistWordException() {
		super(ExceptionCode.NOT_EXIST_ACCOUNT_EXCEPTION.getErrorMessage());
	}

	public NotExistWordException(String message) {
		super(message);
	}
}
