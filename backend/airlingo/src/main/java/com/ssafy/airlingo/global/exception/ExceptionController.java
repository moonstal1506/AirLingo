package com.ssafy.airlingo.global.exception;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.ssafy.airlingo.global.response.ResponseResult;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestControllerAdvice(basePackages = "com.ssafy.airlingo")
public class ExceptionController {

	@ExceptionHandler(IncorrectLanguageCodeException.class)
	public ResponseResult incorrectLanguageCodeException(IncorrectLanguageCodeException err) {
		log.info("Error : {}", err.getClass());
		log.info("Error Message : {}", err.getMessage());
		return ResponseResult.exceptionResponse(ExceptionCode.INCORRECT_LANGUAGE_CODE_EXCEPTION);
	}

	@ExceptionHandler(NotExistWordException.class)
	public ResponseResult notExistWordException(NotExistWordException err) {
		log.info("Error : {}", err.getClass());
		log.info("Error Message : {}", err.getMessage());
		return ResponseResult.exceptionResponse(ExceptionCode.NOT_EXIST_WORD_EXCEPTION);
	}

	@ExceptionHandler(NotExistAccountException.class)
	public ResponseResult notExistAccountException(NotExistAccountException err) {
		log.info("Error : {}", err.getClass());
		log.info("Error Message : {}", err.getMessage());
		return ResponseResult.exceptionResponse(ExceptionCode.NOT_EXIST_ACCOUNT_EXCEPTION);
	}

	@ExceptionHandler(ExpiredRefreshTokenException.class)
	public ResponseResult expiredRefreshTokenException(ExpiredRefreshTokenException err) {
		log.info("Error : {}", err.getClass());
		log.info("Error Message : {}", err.getMessage());
		return ResponseResult.exceptionResponse(ExceptionCode.EXPIRED_REFRESH_TOKEN_EXCEPTION);
	}

}
