package com.ssafy.airlingo.domain.matching.response;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "매칭 요청 유저 정보")
public class MatchingUserDto {

	@NotNull
	@Schema(description = "사용자 ID", example = "1", required = true)
	private Long userId;

	@NotBlank
	@Schema(description = "사용자 닉네임")
	private String userNickname;

	@NotBlank
	@Schema(description = "사용자 이미지")
	private String userImgUrl;

	@NotBlank
	@Schema(description = "사용자 자기소개")
	private String userBio;

	@NotBlank
	@Schema(description = "사용자 모국어")
	private String userNativeLanguage;

	@NotBlank
	@Schema(description = "사용자 학습어")
	private String userStudyLanguage;

	@Schema(description = "사용자 관심언어")
	private List<String> userInterestLanguages;

	@Schema(description = "사용자 별점")
	private double userRating;

	@NotNull
	@Schema(description = "마일리지 사용여부")
	private boolean usingMileage;
}
