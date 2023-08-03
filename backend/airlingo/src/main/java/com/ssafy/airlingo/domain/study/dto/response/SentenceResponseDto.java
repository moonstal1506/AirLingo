package com.ssafy.airlingo.domain.study.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Schema(description = "화자와 문장을 담은 DTO")
public class SentenceResponseDto {

	@Schema(description = "화자", example = "1")
	private String speaker;

	@Schema(description = "문잔 내용", example = "2")
	private String sentence;

	public static SentenceResponseDto createNewSentenceResponseDto(String speaker , String sentence){
		return SentenceResponseDto.builder()
			.speaker(speaker)
			.sentence(sentence)
			.build();
	}
}
