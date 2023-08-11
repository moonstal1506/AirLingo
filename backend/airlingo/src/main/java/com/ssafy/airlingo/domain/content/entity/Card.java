package com.ssafy.airlingo.domain.content.entity;

import com.ssafy.airlingo.domain.content.dto.response.CardResponseDto;
import com.ssafy.airlingo.global.entity.LanguageCode;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = "card")
@Entity
public class Card {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long cardId;

	@Enumerated(EnumType.STRING)
	private CardCode cardCode;

	@Column(nullable = false)
	private String cardEng;

	@Column(nullable = false)
	private String cardKor;

	public CardResponseDto toCardResponseDto(String languageCode) {
		return CardResponseDto.builder()
			.cardId(cardId)
			.subject(languageCode.equals(LanguageCode.KOR.toString())
				? cardKor
				: cardEng)
			.build();
	}
}
