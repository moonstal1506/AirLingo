package com.ssafy.airlingo.global.exception;

import lombok.Getter;

/**
 *  ErrorCode는 임의로 지정하였음
 */
@Getter
public enum ExceptionCode {

	INCORRECT_LANGUAGE_CODE_EXCEPTION(450, "부적절한 언어 코드 입니다."),
	NOT_EXIST_WORD_EXCEPTION(460, "요청한 단어가 존재하지 않습니다."),
	NOT_EXIST_ACCOUNT_EXCEPTION(470, "사용자가 존재하지 않습니다."),
	NOT_FOUND_LANGUAGE_EXCEPTION(471, "요청한 언어를 찾을 수 없습니다."),
	NOT_FOUND_GRADE_EXCEPTION(472, "요청한 등급을 찾을 수 없습니다."),
	EMPTY_WORD_LIST_EXCEPTION(473, "단어장이 비어있습니다."),
	EXPIRED_REFRESH_TOKEN_EXCEPTION(480, "Refresh Token이 만료되었습니다."),
	SERVER_EXCEPTION(500, "서버에서 예측하지 못한 에러가 발생했습니다.");

	private final int errorCode;
	private final String errorMessage;

	ExceptionCode(int errorCode, String errorMessage) {
		this.errorCode = errorCode;
		this.errorMessage = errorMessage;
	}
}

