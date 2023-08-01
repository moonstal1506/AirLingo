package com.ssafy.airlingo.domain.language.dto.response;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LearningTimeResponseDto {

	@Schema(description = "언어별 총 대화 시간")
	private List<LearningLanguageTimeResponseDto> learningLanguageResponseList;

	@Schema(description = "총 대화 시간", example = "17")
	private int totalStudyTime;
}
