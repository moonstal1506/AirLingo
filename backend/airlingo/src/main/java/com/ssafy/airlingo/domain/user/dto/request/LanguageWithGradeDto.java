package com.ssafy.airlingo.domain.user.dto.request;

import com.ssafy.airlingo.domain.language.entity.Grade;
import com.ssafy.airlingo.domain.language.entity.Language;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@NoArgsConstructor
@ToString
public class LanguageWithGradeDto {
	private Language language;
	private Grade grade;

	public LanguageWithGradeDto(Language language, Grade grade) {
		this.language = language;
		this.grade = grade;
	}
}
