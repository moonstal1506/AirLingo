package com.ssafy.airlingo.global.exception;

public class NotEnoughMileageException extends RuntimeException {

	public NotEnoughMileageException() {
		super(ExceptionCode.NOT_ENOUGH_MILEAGE_EXCEPTION.getErrorMessage());
	}

	public NotEnoughMileageException(String message) {
		super(message);
	}
}
