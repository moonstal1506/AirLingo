package com.ssafy.airlingo.domain.language.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.airlingo.domain.language.dto.request.EvaluateUserRequestDto;
import com.ssafy.airlingo.domain.language.service.RecordService;
import com.ssafy.airlingo.global.response.ResponseResult;
import com.ssafy.airlingo.global.response.SingleResponseResult;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@ApiResponses({
	@ApiResponse(responseCode = "200", description = "응답이 성공적으로 반환되었습니다."),
	@ApiResponse(responseCode = "400", description = "응답이 실패하였습니다.",
		content = @Content(schema = @Schema(implementation = ResponseResult.class)))})
@Tag(name = "Record Controller", description = "실력 평가 관련 컨트롤러")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api")
public class RecordController {

	private final RecordService recordService;

	@Operation(summary = "Evaluate User", description = "대화 상대방 실력,매너 평가")
	@PostMapping("/record")
	public ResponseResult evaluateUser(@Valid @RequestBody EvaluateUserRequestDto evaluateUserRequestDto) {
		log.info("RecordController_evaluateUser");
		if (recordService.evaluateUser(evaluateUserRequestDto))
			return ResponseResult.successResponse;
		return ResponseResult.failResponse;
	}

	@Operation(summary = "Record Statistic", description = "언어별 통계 - 학습 시간 분석, 학습 횟수")
	@GetMapping("/record/statistic/{userId}")
	public ResponseResult getStatistic(@PathVariable Long userId) {
		log.info("getStatistic");
		return new SingleResponseResult<>(recordService.getStatistic(userId));
	}
}
