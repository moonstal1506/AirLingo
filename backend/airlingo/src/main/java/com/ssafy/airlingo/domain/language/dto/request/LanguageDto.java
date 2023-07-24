package com.ssafy.airlingo.domain.language.dto.request;

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
	private String languageKorName;
	private String languageEngName;

	public LanguageDto(Language language) {
		this.languageId = language.getLanguageId();
		this.languageKorName = language.getLanguageKorName();
		this.languageEngName = language.getLanguageEngName();
	}
}
