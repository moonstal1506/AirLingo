package com.ssafy.airlingo.domain.language.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LearningLanguageNumberResponseDto {
	private Long languageId;
	private String languageName;
	private Long percent;
	private Long totalNumber;
}
