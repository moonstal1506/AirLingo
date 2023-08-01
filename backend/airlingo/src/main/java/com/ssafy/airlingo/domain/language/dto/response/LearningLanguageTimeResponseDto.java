package com.ssafy.airlingo.domain.language.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LearningLanguageTimeResponseDto {

	@Schema(description = "언어 ID", example = "1")
	private Long languageId;

	@Schema(description = "언어 이름", example = "영어")
	private String languageName;

	@Schema(description = "학습한 언어 시간 비율", example = "48")
	private Long percent;

	@Schema(description = "학습한 언어 총 시간", example = "10")
	private Long totalTime;
}
