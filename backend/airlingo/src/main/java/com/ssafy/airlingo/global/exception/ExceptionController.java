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
	public ResponseResult ExistEmailException(IncorrectLanguageCodeException e) {
		log.info("Error : {}",e.getClass());
		log.info("Error Message : {}",e.getMessage());
		return ResponseResult.exceptionResponse(ExceptionCode.INCORRECT_LANGUAGE_CODE_EXCEPTION);
	}

	@ExceptionHandler(NotExistAccountException.class)
	public ResponseResult NotExistAccountException(NotExistAccountException e)
	{
		log.info("Error : {}",e.getClass());
		log.info("Error Message : {}",e.getMessage());
		return ResponseResult.exceptionResponse(ExceptionCode.NOT_EXIST_ACCOUNT_EXCEPTION);
	}

}
