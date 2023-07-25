package com.ssafy.airlingo.domain.language.entity;

import com.ssafy.airlingo.domain.language.dto.response.LanguageDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "language")
@Entity
public class Language {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long languageId;

	@Column(nullable = false, unique = true, length = 50)
	private String languageKorName;

	@Column(nullable = false, unique = true, length = 50)
	private String languageEngName;

	@Column(nullable = false, unique = true, length = 50)
	private String languageCode;

	public LanguageDto toLanguageDto() {
		return LanguageDto.builder()
			.languageId(languageId)
			.languageKorName(languageKorName)
			.languageEngName(languageEngName)
			.build();
	}
}
