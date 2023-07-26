package com.ssafy.airlingo.domain.matching.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.airlingo.domain.matching.request.MatchingRequestDto;
import com.ssafy.airlingo.domain.matching.response.MatchingResponseDto;
import com.ssafy.airlingo.domain.matching.response.MatchingUserDto;
import com.ssafy.airlingo.domain.matching.service.MatchingServiceImpl;
import com.ssafy.airlingo.domain.matching.service.MatchingUserProducer;
import com.ssafy.airlingo.global.response.ResponseResult;

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
@Slf4j
@Tag(name = "Matching Controller", description = "매칭 관련 컨트롤러")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class MatchingController {

	private final MatchingUserProducer producer;
	private final MatchingServiceImpl matchingService;

	@Operation(summary = "Matching", description = "매칭 대기열 등록")
	@PostMapping("/matching")
	public ResponseResult matching(@RequestBody @Valid MatchingRequestDto matchingRequestDto) {
		log.info("matching request : {}", matchingRequestDto);
		MatchingUserDto matchingUser = matchingService.findMatchingUser(matchingRequestDto);
		producer.sendMatchingUser(matchingUser);
		return ResponseResult.successResponse;
	}

	@Operation(summary = "Matching Result", description = "매칭 결과 반환")
	@PostMapping("/matching/result")
	public ResponseResult matchingResult(@RequestBody @Valid MatchingResponseDto matchingResponseDto) {
		matchingService.useMileage(matchingResponseDto);
		log.info("matchingResult : {}", matchingResponseDto.toString());
		return ResponseResult.successResponse;
	}
}
