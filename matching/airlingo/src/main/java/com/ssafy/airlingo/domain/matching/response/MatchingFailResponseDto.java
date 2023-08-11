package com.ssafy.airlingo.domain.matching.response;

import java.util.List;

import com.ssafy.airlingo.domain.matching.request.MatchingUserDto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Schema(description = "매칭실패한 유저들 정보")
public class MatchingFailResponseDto {

	@NotNull
	@Schema(description = "매칭 실패한 유저들 정보")
	private List<MatchingUserDto> matchingFailUserList;
}
