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
	private int languageId;
	private int gradeId;

	public LanguageWithGradeDto(int languageId, int gradeId) {
		this.languageId = languageId;
		this.gradeId = gradeId;
	}
}
