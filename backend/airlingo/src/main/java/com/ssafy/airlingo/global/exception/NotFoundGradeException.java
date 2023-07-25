package com.ssafy.airlingo.global.exception;

public class NotFoundGradeException extends RuntimeException {
	public NotFoundGradeException() {
		super(ExceptionCode.NOT_FOUND_GRADE_EXCEPTION.getErrorMessage());
	}

	public NotFoundGradeException(String message) {
		super(message);
	}
}
