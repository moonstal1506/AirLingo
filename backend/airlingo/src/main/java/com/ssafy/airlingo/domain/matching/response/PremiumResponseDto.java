package com.ssafy.airlingo.domain.matching.response;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Schema(description = "프리미엄 매칭 정보")
public class PremiumResponseDto {

	@NotNull
	@Schema(description = "프리미엄 매칭 가능 여부")
	private boolean isPossiblePremium;

	@NotNull
	@Schema(description = "마일리지 정보")
	private int mileage;
}
