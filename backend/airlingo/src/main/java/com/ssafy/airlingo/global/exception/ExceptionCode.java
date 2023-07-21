package com.ssafy.airlingo.global.exception;

import lombok.Getter;

/**
 *  ErrorCode는 임의로 지정하였음
 */
@Getter
public enum ExceptionCode {

	INCORRECT_LANGUAGE_CODE_EXCEPTION(450, "부적절한 언어 코드 입니다."),
	SERVER_EXCEPTION(500, "서버에서 예측하지 못한 에러가 발생했습니다.");

	private int errorCode;
	private String errorMessage;

	ExceptionCode(int errorCode, String errorMessage) {
		this.errorCode = errorCode;
		this.errorMessage = errorMessage;
	}
}

