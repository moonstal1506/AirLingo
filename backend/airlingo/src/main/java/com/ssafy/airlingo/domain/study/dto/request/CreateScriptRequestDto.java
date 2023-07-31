package com.ssafy.airlingo.domain.study.dto.request;

import org.springframework.web.multipart.MultipartFile;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "피드백 끝난 스크립트 저장 DTO")
public class CreateScriptRequestDto {

	@Schema(description = "스터디 ID", example = "1")
	private Long studyId;

	@Schema(description = "카드 ID", example = "2")
	private Long cardId;

	// @Schema(description = "대화 음성 파일")
	// private MultipartFile recordFile;

}
