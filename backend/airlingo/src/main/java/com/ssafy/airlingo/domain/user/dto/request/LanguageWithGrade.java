package com.ssafy.airlingo.domain.user.dto.request;

import com.ssafy.airlingo.domain.language.entity.Language;
import com.ssafy.airlingo.domain.language.entity.Grade;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class LanguageWithGrade {
	private Language language;
	private Grade grade;

	public LanguageWithGrade(Language language, Grade grade) {
		this.language = language;
		this.grade = grade;
	}
}
