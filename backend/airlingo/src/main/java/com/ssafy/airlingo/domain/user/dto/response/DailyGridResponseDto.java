package com.ssafy.airlingo.domain.user.dto.response;

import java.time.LocalDateTime;

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
@Schema(description = "데일리 그리드 정보")
public class DailyGridResponseDto {

	@Schema(description = "로그인 유저 ID", example = "1")
	private long userId;

	@Schema(description = "데일리 그리드 ID", example = "1")
	private long dailyGridId;

	@Schema(description = "데일리 그리드 개수", example = "3")
	private int dailyGridCount;

	@Schema(description = "데일리 그리드 날짜", example = "2023-07-31 16:19:27.689513")
	private LocalDateTime createdDate;
}
