package com.ssafy.airlingo.domain.language.dto.response;

import com.ssafy.airlingo.domain.language.entity.Language;

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
@Schema(description = "각 언어에 대한 정보")
public class LanguageDto {

	@Schema(description = "언어 ID", example = "1")
	private Long languageId;

	@Schema(description = "언어 한국어버전", example = "한국어")
	private String languageKorName;

	@Schema(description = "언어 영어버전", example = "Korean")
	private String languageEngName;

	@Schema(description = "등급 이름(영어)", example = "A1")
	private String gradeName;

	@Schema(description = "등급 이름(한글)", example = "입문")
	private String gradeKorName;
}
