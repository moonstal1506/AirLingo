package com.ssafy.airlingo.domain.language.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.airlingo.domain.language.service.LanguageService;
import com.ssafy.airlingo.global.response.ListResponseResult;
import com.ssafy.airlingo.global.response.ResponseResult;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Tag(name = "Language Controller", description = "언어/등급 컨트롤러")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/")
public class LanguageController {

	private final LanguageService languageService;

	@Operation(summary = "Get Language List", description = "전체 언어 리스트 조회")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "전체 언어 조회 성공"),
		@ApiResponse(responseCode = "400", description = "전체 언어 조회 실패")
	})
	@GetMapping("/language")
	public ResponseResult getLanguageList() {
		log.info("LanguageController_getLanguageList -> 전체 언어 리스트 조회 시작");
		return new ListResponseResult<>(languageService.getLanguageList());
	}

	@Operation(summary = "Get Grade List", description = "전체 등급 리스트 조회")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "전체 등급 조회 성공"),
		@ApiResponse(responseCode = "400", description = "전체 등급 조회 실패")
	})
	@GetMapping("/grade")
	public ResponseResult getGradeList() {
		log.info("LanguageController_getGradeList -> 전체 등급 리스트 조회 시작");
		return new ListResponseResult<>(languageService.getGradeList());
	}
}
