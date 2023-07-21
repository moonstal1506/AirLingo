package com.ssafy.airlingo.domain.language.dto;

import com.ssafy.airlingo.domain.language.entity.Language;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LanguageDto {
	private int languageId;
	private String languageName;

	public LanguageDto(Language language) {
		this.languageId = language.getLanguageId();
		this.languageName = language.getLanguageName();
	}
}
