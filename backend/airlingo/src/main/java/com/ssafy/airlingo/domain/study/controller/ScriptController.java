package com.ssafy.airlingo.domain.study.controller;

import java.io.IOException;

import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.*;

import com.ssafy.airlingo.domain.study.dto.request.CreateScriptRequestDto;
import com.ssafy.airlingo.domain.study.dto.request.ModifyScriptContentRequestDto;
import com.ssafy.airlingo.domain.study.service.ScriptService;
import com.ssafy.airlingo.global.response.ResponseResult;
import com.ssafy.airlingo.global.response.SingleResponseResult;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

@ApiResponses({
	@ApiResponse(responseCode = "200", description = "응답이 성공적으로 반환되었습니다."),
	@ApiResponse(responseCode = "400", description = "응답이 실패하였습니다.",
		content = @Content(schema = @Schema(implementation = ResponseResult.class)))})
@Tag(name = "Script Controller", description = "스크립트 관련 컨트롤러")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/script")
public class ScriptController {

	private final ScriptService scriptService;

	@Operation(summary = "Get Script By Script Id", description = "스크립트 아이디로 스크립트 상세 정보 조회")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "스크립트 조회 성공"),
		@ApiResponse(responseCode = "461", description = "스크립트가 존재하지 않습니다."),
		@ApiResponse(responseCode = "400", description = "스크립트 조회 실패"),
	})
	@GetMapping("/{scriptId}")
	public ResponseResult getScriptById(@PathVariable Long scriptId) {
		log.info("ScriptController_getScriptById -> 스크립트 조회");
		return new SingleResponseResult<>(scriptService.findScriptByScriptId(scriptId));
	}

	@Operation(summary = "Delete Script By Script Id", description = "스크립트 아이디로 스크립트 삭제")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "스크립트 삭제 성공"),
		@ApiResponse(responseCode = "400", description = "스크립트 삭제 실패"),
	})
	@DeleteMapping("/{scriptId}")
	public ResponseResult deleteScriptById(@PathVariable Long scriptId) {
		log.info("ScriptController_deleteScriptById -> 스크립트 삭제");
		scriptService.deleteScriptById(scriptId);
		return ResponseResult.successResponse;
	}

	@Operation(summary = "Save script Entity before feedback", description = "스크립트 생성")
	@PostMapping
	public ResponseResult CreateScript(@RequestParam MultipartFile voiceFile,
									   @RequestParam Long studyId,
									   @RequestParam Long cardId) throws

		IOException,
		ParseException {
		log.info("ScriptController_CreateScript");
		return new SingleResponseResult<>(scriptService.createScript(voiceFile,studyId,cardId));
	}
	@Operation(summary = "Save script content after feedback", description = "피드백 끝난 스크립트 저장")
	@PutMapping
	public ResponseResult ModifyScriptContent(@Valid @RequestBody ModifyScriptContentRequestDto modifyScriptRequestDto) {
		log.info("ScriptController_ModifyScriptContent");
		scriptService.modifyScriptContent(modifyScriptRequestDto);
		return ResponseResult.successResponse;
	}

}
