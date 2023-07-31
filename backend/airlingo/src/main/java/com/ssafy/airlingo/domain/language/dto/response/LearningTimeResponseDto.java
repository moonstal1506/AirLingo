package com.ssafy.airlingo.domain.language.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LearningTimeResponseDto {
	private List<LearningLanguageTimeResponseDto> learningLanguageResponseList;
	private int totalStudyTime;
}
