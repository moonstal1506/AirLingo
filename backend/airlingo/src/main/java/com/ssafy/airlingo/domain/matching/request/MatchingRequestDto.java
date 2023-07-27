package com.ssafy.airlingo.domain.matching.request;

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

	@NotNull
	@Schema(description = "사용자 학습 언어 ID")
	private Long studyLanguageId;

	@NotNull
	@Schema(description = "프리미엄 매칭 여부")
	private boolean premium;
}
