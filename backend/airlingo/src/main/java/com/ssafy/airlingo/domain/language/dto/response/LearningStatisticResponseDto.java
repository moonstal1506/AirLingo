package com.ssafy.airlingo.domain.language.dto.response;

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
	private LearningNumberResponseDto numberResponse;
	private LearningTimeResponseDto timeResponse;
}
