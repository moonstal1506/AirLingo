package com.ssafy.airlingo.domain.language.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.airlingo.domain.language.service.LanguageService;
import com.ssafy.airlingo.global.response.ListResponseResult;
import com.ssafy.airlingo.global.response.ResponseResult;
import com.ssafy.airlingo.global.response.SingleResponseResult;
import com.ssafy.airlingo.global.util.PapagoService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@ApiResponses({
	@ApiResponse(responseCode = "200", description = "응답이 성공적으로 반환되었습니다."),
	@ApiResponse(responseCode = "400", description = "응답이 실패하였습니다.",
		content = @Content(schema = @Schema(implementation = ResponseResult.class)))})
@Tag(name = "Language Controller", description = "언어/등급 컨트롤러")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class LanguageController {

	private final LanguageService languageService;
	private final PapagoService papagoService;

	@Operation(summary = "Get Language List", description = "전체 언어 리스트 조회")
	@GetMapping("/language")
	public ResponseResult getLanguageList() {
		log.info("LanguageController_getLanguageList -> 전체 언어 리스트 조회 시작");
		return new ListResponseResult<>(languageService.getLanguageList());
	}

	@Operation(summary = "Get Grade List", description = "전체 등급 리스트 조회")
	@GetMapping("/grade")
	public ResponseResult getGradeList() {
		log.info("LanguageController_getGradeList -> 전체 등급 리스트 조회 시작");
		return new ListResponseResult<>(languageService.getGradeList());
	}

	@Operation(summary = "Get Translated Word", description = "번역된 단어 조회")
	@GetMapping("/word")
	public ResponseResult getTranslatedWord(@RequestParam String source, @RequestParam String target,
		@RequestParam String text) {
		log.info("LanguageController_getTranslatedWord -> 파파고 API 사용");
		return new SingleResponseResult<>(papagoService.getTranslatedWord(source, target, text));
	}
}
