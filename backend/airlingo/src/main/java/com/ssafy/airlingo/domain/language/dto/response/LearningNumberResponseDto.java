package com.ssafy.airlingo.domain.language.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LearningNumberResponseDto {

	@Schema(description = "언어별 대화 횟수")
	private List<LearningLanguageNumberResponseDto> languageNumberResponseDtoList;

	@Schema(description = "총 대화 횟수", example = "17")
	private int totalStudyNumber;
}
