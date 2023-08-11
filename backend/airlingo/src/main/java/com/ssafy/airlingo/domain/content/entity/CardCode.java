package com.ssafy.airlingo.domain.content.entity;

import com.ssafy.airlingo.domain.content.dto.response.CardCodeResponseDto;

public enum CardCode {
	FREE_TALK("FREE_TALK", "프리토킹", "Free Talk"),
	WEATHER("WEATHER", "날씨", "Weather"),
	FOOD("FOOD", "음식", "Food"),
	TRAVEL("TRAVEL", "여행", "Travel"),
	FAMILY("FAMILY", "가족", "Family"),
	HOBBY("HOBBY", "취미", "Hobby"),
	SPORTS("SPORTS", "스포츠", "Sports"),
	HEALTH("HEALTH", "건강", "Health"),
	FREE_TIME("FREE_TIME", "여가시간", "Free Time"),
	RECTAL("RECTAL", "직장", "Rectal"),
	LOVE("LOVE", "연애", "Love"),
	MOVIE("MOVIE", "영화", "Movie");

	private String korSubject;
	private String engSubject;
	private String code;

	CardCode(String code, String korSubject, String engSubject) {
		this.code = code;
		this.korSubject = korSubject;
		this.engSubject = engSubject;
	}

	public CardCodeResponseDto toCardCodeResponseDto() {
		return CardCodeResponseDto.builder()
			.code(code)
			.korSubject(korSubject)
			.engSubject(engSubject)
			.build();
	}
}
