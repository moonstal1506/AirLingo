package com.ssafy.airlingo.domain.report.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.airlingo.domain.report.dto.request.ReportUserRequestDto;
import com.ssafy.airlingo.domain.report.service.ReportService;
import com.ssafy.airlingo.global.exception.ExceptionCode;
import com.ssafy.airlingo.global.response.ListResponseResult;
import com.ssafy.airlingo.global.response.ResponseResult;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
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
@Tag(name = "Report Controller", description = "신고 관련 컨트롤러")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api")
public class ReportController {

	private final ReportService reportService;

	@Operation(summary = "GetAllReportItems", description = "모든 신고 항목 조회")
	@ApiResponse(responseCode = "450", description = "부적절한 언어 코드 입니다.")
	@GetMapping("/reportItems")
	public ResponseResult getReportItemList(
		@Parameter(description = "조회할 언어 코드", required = true)
		@RequestParam String languageCode){
		log.info("ReportController_getReportItemList");
		return new ListResponseResult<>(reportService.getReportItemList(languageCode));
	}

	@Operation(summary = "Report User", description = "유저 신고 기능")
	@PostMapping("/report")
	public ResponseResult reportUser(@Valid @RequestBody ReportUserRequestDto reportUserRequestDto){
		log.info("ReportController_reportUser");
		reportService.reportUser(reportUserRequestDto);
		return ResponseResult.successResponse;
	}
}
