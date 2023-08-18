package com.ssafy.airlingo.domain.word.entity;

import com.ssafy.airlingo.domain.user.entity.User;
import com.ssafy.airlingo.domain.word.dto.response.WordResponseDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "word")
@Entity
public class Word {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long wordId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@Column(nullable = false, length = 100)
	private String wordName;

	@Column(nullable = false, length = 100)
	private String wordDescription;

	public WordResponseDto toWordResponseDto() {
		return WordResponseDto.builder()
			.wordId(wordId)
			.wordName(wordName)
			.wordDescription(wordDescription)
			.build();
	}
}
