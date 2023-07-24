package com.ssafy.airlingo.global.exception;

public class IncorrectLanguageCodeException extends RuntimeException {
	public IncorrectLanguageCodeException() {
		super(ExceptionCode.INCORRECT_LANGUAGE_CODE_EXCEPTION.getErrorMessage());
	}

	public IncorrectLanguageCodeException(String message) {
		super(message);
	}
}
