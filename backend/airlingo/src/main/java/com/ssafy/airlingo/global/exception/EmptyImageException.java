package com.ssafy.airlingo.global.exception;

public class EmptyImageException extends RuntimeException {
	public EmptyImageException() {
		super(ExceptionCode.EMPTY_IMAGE_EXCEPTION.getErrorMessage());
	}

	public EmptyImageException(String message) {
		super(message);
	}
}
