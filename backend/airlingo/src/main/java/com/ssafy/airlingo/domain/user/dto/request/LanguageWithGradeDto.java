package com.ssafy.airlingo.domain.user.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
public class LanguageWithGradeDto {
	private Long languageId;
	private Long gradeId;

	public LanguageWithGradeDto(Long languageId, Long gradeId) {
		this.languageId = languageId;
		this.gradeId = gradeId;
	}
}
