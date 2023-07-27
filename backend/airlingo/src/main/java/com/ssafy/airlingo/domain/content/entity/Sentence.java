package com.ssafy.airlingo.domain.content.entity;

import com.ssafy.airlingo.domain.content.dto.response.CardResponseDto;
import com.ssafy.airlingo.domain.content.dto.response.SentenceResponseDto;
import com.ssafy.airlingo.global.entity.LanguageCode;

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
@Table(name = "sentence")
@Entity
public class Sentence {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long sentenceId;

	@Column(nullable = false)
	private String sentenceEng;

	@Column(nullable = false)
	private String sentenceKor;

	public SentenceResponseDto toSentenceResponseDto() {
		return SentenceResponseDto.builder()
			.sentenceId(sentenceId)
			.sentenceEng(sentenceEng)
			.sentenceKor(sentenceKor)
			.build();
	}
}
