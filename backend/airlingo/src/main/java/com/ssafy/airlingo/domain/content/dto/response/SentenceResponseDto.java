package com.ssafy.airlingo.domain.content.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "오늘의 회화")
public class SentenceResponseDto {

	@Schema(description = "오늘의 회화 ID", example = "1", required = true)
	private Long sentenceId;

	@Schema(description = "오늘의 회화 영어", example = "As far as I am concerned, the report should be finished now.", required = true)
	private String sentenceEng;

	@Schema(description = "오늘의 회화 한국어", example = "제가 아는 바에 의하면 지금쯤 보고서가 완성되었어야 하는데요.", required = true)
	private String sentenceKor;
}
