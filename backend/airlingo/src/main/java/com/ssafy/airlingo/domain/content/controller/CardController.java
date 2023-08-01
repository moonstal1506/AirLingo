package com.ssafy.airlingo.domain.content.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.airlingo.domain.content.service.CardServiceImpl;
import com.ssafy.airlingo.global.response.ListResponseResult;
import com.ssafy.airlingo.global.response.ResponseResult;
import com.ssafy.airlingo.global.response.SingleResponseResult;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
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
@Tag(name = "Card Controller", description = "대화 주제 관련 컨트롤러")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api")
public class CardController {

	private final CardServiceImpl cardServiceImpl;

	@Operation(summary = "GetCard", description = "대화 대주제에 따른 랜덤 대화 소주제 제공")
	@GetMapping("/card")
	public ResponseResult getCard(
		@Parameter(description = "대화 대주제 코드", required = true, example = "FOOD", name = "cardCode")
		@RequestParam String cardCode,
		@Parameter(description = "사용할 언어 코드", required = true, example = "KOR", name = "languageCode")
		@RequestParam String languageCode) {
		log.info("CardController_getCardBySubject");
		return new SingleResponseResult<>(cardServiceImpl.getCard(cardCode, languageCode));
	}

	@Operation(summary = "GetAllCardCode", description = "모든 카드 대화 대주제 반환")
	@GetMapping("/cardCode")
	public ResponseResult getCardCodeList() {
		log.info("CardController_getCardCodeList");
		return new ListResponseResult<>(cardServiceImpl.getCardCodeList());
	}

}
