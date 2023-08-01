package com.ssafy.airlingo.domain.language.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LearningStatisticResponseDto {

	@Schema(description = "대화 횟수 통계")
	private LearningNumberResponseDto numberResponse;

	@Schema(description = "대화 시간 통계")
	private LearningTimeResponseDto timeResponse;
}
