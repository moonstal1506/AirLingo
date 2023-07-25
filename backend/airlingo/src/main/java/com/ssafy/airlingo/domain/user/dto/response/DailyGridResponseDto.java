package com.ssafy.airlingo.domain.user.dto.response;

import java.time.LocalDateTime;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Schema(description = "데일리 그리드 정보")
public class DailyGridResponseDto {
	private long userId;
	private long dailyGridId;
	private int dailyGridCount;
	private LocalDateTime createdDate;
}
