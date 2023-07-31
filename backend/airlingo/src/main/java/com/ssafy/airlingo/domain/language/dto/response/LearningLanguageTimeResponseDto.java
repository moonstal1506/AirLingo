package com.ssafy.airlingo.domain.language.dto.response;

import lombok.*;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LearningLanguageTimeResponseDto {
	private Long languageId;
	private String languageName;
	private Long percent;
	private Long totalTime;
}
