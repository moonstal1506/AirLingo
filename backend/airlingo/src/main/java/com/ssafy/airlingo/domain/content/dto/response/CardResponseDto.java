package com.ssafy.airlingo.domain.content.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
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
@Schema(description = "대화 주제 정보")
public class CardResponseDto {

	@Schema(description = "카드 ID", example = "1", required = true)
	private Long cardId;

	@Schema(description = "대화 주제", example = "좋아하는 요리나 음식 종류가 있으신가요?", required = true)
	private String subject;
}
