package com.ssafy.airlingo.global.exception;

public class EmptyStudyListException extends RuntimeException {
	public EmptyStudyListException() {
		super(ExceptionCode.EMPTY_STUDY_LIST_EXCEPTION.getErrorMessage());
	}

	public EmptyStudyListException(String message) {
		super(message);
	}
}
