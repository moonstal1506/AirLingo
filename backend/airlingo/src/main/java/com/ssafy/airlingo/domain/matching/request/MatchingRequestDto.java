package com.ssafy.airlingo.domain.matching.request;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "매칭 요청 정보")
public class MatchingRequestDto {

	@NotNull
	@Schema(description = "사용자 ID", required = true)
	private Long userId;

	@NotBlank
	@Schema(description = "사용자 학습어")
	private String studyLanguage;
}
