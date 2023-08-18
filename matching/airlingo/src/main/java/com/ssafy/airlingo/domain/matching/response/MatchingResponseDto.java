package com.ssafy.airlingo.domain.matching.response;

import com.ssafy.airlingo.domain.matching.request.MatchingUserDto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Schema(description = "매칭된 유저 정보")
public class MatchingResponseDto {

	@NotNull
	@Schema(description = "매칭된 유저1 정보")
	private MatchingUserDto user1;

	@NotNull
	@Schema(description = "매칭된 유저2 정보")
	private MatchingUserDto user2;
}
