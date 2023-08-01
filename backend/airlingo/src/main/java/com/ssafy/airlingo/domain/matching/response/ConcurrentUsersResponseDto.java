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
@Schema(description = "실시간 사용자 통계")
public class ConcurrentUsersResponseDto {

	@NotNull
	@Schema(description = "접속한 유저의 수", example = "100")
	private Long ConcurrentUsersSize;

	@NotNull
	@Schema(description = "매칭중인 유저의 수", example = "10")
	private int waitingUsersSize;
}
