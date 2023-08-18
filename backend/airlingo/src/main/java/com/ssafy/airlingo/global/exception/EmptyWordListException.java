package com.ssafy.airlingo.global.exception;

public class EmptyWordListException extends RuntimeException {
	public EmptyWordListException() {
		super(ExceptionCode.EMPTY_WORD_LIST_EXCEPTION.getErrorMessage());
	}

	public EmptyWordListException(String message) {
		super(message);
	}
}
