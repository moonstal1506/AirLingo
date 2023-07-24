package com.ssafy.airlingo.global.exception;

public class NotExistWordException extends RuntimeException {
	public NotExistWordException() {
		super(ExceptionCode.NOT_EXIST_WORD_EXCEPTION.getErrorMessage());
	}

	public NotExistWordException(String message) {
		super(message);
	}
}
