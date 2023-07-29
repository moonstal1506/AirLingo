package com.ssafy.airlingo.domain.matching.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.airlingo.domain.matching.request.MatchingRequestDto;
import com.ssafy.airlingo.domain.matching.response.MatchingResponseDto;
import com.ssafy.airlingo.domain.matching.response.MatchingUserDto;
import com.ssafy.airlingo.domain.matching.service.MatchingService;
import com.ssafy.airlingo.domain.matching.service.MatchingUserProducer;
import com.ssafy.airlingo.global.handler.WebSocketHandler;
import com.ssafy.airlingo.global.openvidu.OpenViduManager;
import com.ssafy.airlingo.global.response.ResponseResult;
import com.ssafy.airlingo.global.response.SingleResponseResult;

import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
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
@RequestMapping("/api/matching")
public class MatchingController {

	private final MatchingUserProducer producer;
	private final MatchingService matchingService;
	private final WebSocketHandler webSocketHandler;
	private final OpenViduManager openViduManager;

	@Operation(summary = "Matching", description = "매칭 대기열 등록")
	@PostMapping
	public ResponseResult matching(@RequestBody @Valid MatchingRequestDto matchingRequestDto) {
		log.info("matching request : {}", matchingRequestDto);
		MatchingUserDto matchingUser = matchingService.findMatchingUser(matchingRequestDto);
		producer.sendMatchingUser(matchingUser);
		return ResponseResult.successResponse;
	}

	@Operation(summary = "Matching Result", description = "매칭 성공 결과 반환")
	@PostMapping("/result")
	public void matchingResult(@RequestBody @Valid MatchingResponseDto matchingResponseDto) throws
		OpenViduJavaClientException,
		OpenViduHttpException {
		matchingService.useMileage(matchingResponseDto);
		log.info("matchingResult : {}", matchingResponseDto.toString());

		// 매칭이 완료되면 OpenVidu의 sessionId를 얻음
		String sessionId = openViduManager.createSession();

		// WebSocketHandler를 통해 매칭이 완료된 user 2명에게 동일한 sessionId를 보내기
		// 구분자는 String이어야 하므로 userNickname을 사용함
		List<String> userNicknames = new ArrayList<>();
		userNicknames.add(matchingResponseDto.getUser1().getUserNickname());
		userNicknames.add(matchingResponseDto.getUser2().getUserNickname());
		webSocketHandler.sendSessionIdToUsers(sessionId, userNicknames);
	}

	@Operation(summary = "Concurrent Users size", description = "실시간 사용자 통계")
	@GetMapping("/concurrent-users")
	public SingleResponseResult countConcurrentUsers() {
		return new SingleResponseResult<>(matchingService.getConcurrentUsersSize());
	}
}
