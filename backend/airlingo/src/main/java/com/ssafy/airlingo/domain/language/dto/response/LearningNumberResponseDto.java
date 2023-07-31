package com.ssafy.airlingo.domain.language.dto.response;

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
	private List<LearningLanguageNumberResponseDto> languageNumberResponseDtoList;
	private int totalStudyNumber;
}
