package com.ssafy.airlingo.global.exception;

public class NotExistScriptException extends RuntimeException {
	public NotExistScriptException() {
		super(ExceptionCode.NOT_EXIST_SCRIPT_EXCEPTION.getErrorMessage());
	}

	public NotExistScriptException(String message) {
		super(message);
	}
}
