package com.ssafy.airlingo.global.exception;

public class NotFoundLanguageException extends RuntimeException {
	public NotFoundLanguageException() {
		super(ExceptionCode.NOT_FOUND_LANGUAGE_EXCEPTION.getErrorMessage());
	}

	public NotFoundLanguageException(String message) {
		super(message);
	}
}
