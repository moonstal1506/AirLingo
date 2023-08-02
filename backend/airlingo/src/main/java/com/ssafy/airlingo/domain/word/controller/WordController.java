package com.ssafy.airlingo.domain.word.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.airlingo.domain.word.dto.request.WordRequestDto;
import com.ssafy.airlingo.domain.word.service.WordService;
import com.ssafy.airlingo.global.response.ListResponseResult;
import com.ssafy.airlingo.global.response.ResponseResult;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Tag(name = "Word Controller", description = "단어 컨트롤러")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/word")
public class WordController {

	private final WordService wordService;

	@Operation(summary = "Get Word List", description = "단어장 전체 조회")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "단어장 조회 성공"),
		@ApiResponse(responseCode = "470", description = "사용자가 존재하지 않습니다")
	})
	@GetMapping("/{userId}")
	public ResponseResult getWordListByUserId(@PathVariable Long userId) {
		log.info("WordController_getWordListByUserId -> 저장한 모든 단어 조회 시작");
		return new ListResponseResult<>(wordService.getWordListByUserId(userId));
	}

	@Operation(summary = "Get Word Test List", description = "단어 테스트 리스트 조회")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "단어 테스트 리스트 조회 성공"),
		@ApiResponse(responseCode = "470", description = "사용자가 존재하지 않습니다")
	})
	@GetMapping("/test/{userId}")
	public ResponseResult getWordTestListByUserId(@PathVariable Long userId) {
		log.info("WordController_getWordTestListByUserId -> 단어 테스트 리스트 조회 시작");
		return new ListResponseResult<>(wordService.getWordTestListByUserId(userId));
	}

	@Operation(summary = "Delete Words", description = "선택한 단어 리스트 삭제")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "단어 삭제 성공"),
		@ApiResponse(responseCode = "460", description = "요청한 단어가 존재하지 않습니다"),
		@ApiResponse(responseCode = "470", description = "사용자가 존재하지 않습니다")
	})
	@DeleteMapping("/{userId}")
	public ResponseResult deleteWordByWordId(@PathVariable Long userId, @RequestBody Long[] wordIds) {
		log.info("WordController_deleteWordByWordId -> 단어 삭제 시작");
		wordService.deleteWordsByUserIdAndWordIds(userId, wordIds);
		return ResponseResult.successResponse;
	}

	@Operation(summary = "Save Word", description = "단어 저장")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "단어 저장 성공"),
		@ApiResponse(responseCode = "470", description = "사용자가 존재하지 않습니다")
	})
	@PostMapping("/{userId}")
	public ResponseResult saveWordByUserId(@PathVariable Long userId, @RequestBody WordRequestDto wordRequestDto) {
		log.info("WordController_saveWordByUserId -> 단어 저장 시작");
		wordService.saveWordByUserId(userId, wordRequestDto);
		return ResponseResult.successResponse;
	}
}
