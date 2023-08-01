package com.ssafy.airlingo.domain.language.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "학습 언어 횟수")
public class LearningLanguageNumberResponseDto {

	@Schema(description = "언어 ID", example = "1")
	private Long languageId;

	@Schema(description = "언어 이름", example = "영어")
	private String languageName;

	@Schema(description = "학습한 언어 횟수 비율", example = "38")
	private Long percent;

	@Schema(description = "학습한 언어 총 횟수", example = "3")
	private Long totalNumber;
}
