package com.ssafy.airlingo.domain.matching.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "매칭 요청 정보")
public class MatchingRequestDto {

	@NotNull
	@Schema(description = "사용자 ID", example = "1")
	private Long userId;

	@NotNull
	@Schema(description = "사용자 학습 언어 ID", example = "2")
	private Long studyLanguageId;

	@NotNull
	@Schema(description = "프리미엄 매칭 여부", example = "false")
	private boolean premium;
}
