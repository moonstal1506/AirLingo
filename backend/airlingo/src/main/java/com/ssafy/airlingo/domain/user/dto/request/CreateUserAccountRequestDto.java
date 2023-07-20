package com.ssafy.airlingo.domain.user.dto.request;

import static com.ssafy.airlingo.domain.user.entity.UserState.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.ssafy.airlingo.domain.language.entity.Grade;
import com.ssafy.airlingo.domain.language.entity.Language;
import com.ssafy.airlingo.domain.language.entity.UserLanguage;
import com.ssafy.airlingo.domain.user.entity.User;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@Schema(description = "(CreateUserAccountRequestDto) 회원가입 요청 DTO")
public class CreateUserAccountRequestDto {

	@NotBlank
	@Schema(description = "사용자 닉네임")
	private String userNickname;

	@NotBlank
	@Schema(description = "사용자 로그인 ID")
	private String userLoginId;

	@NotBlank
	@Schema(description = "사용자 비밀번호")
	private String userPassword;

	@Email
	@Schema(description = "사용자 이메일")
	private String userEmail;

	@Schema(description = "사용자 모국어")
	private Language userNativeLanguage;

	@Schema(description = "사용자 관심언어와 해당 언어의 등급")
	private List<LanguageWithGrade> userInterestLanguageList;

	public User toUserEntity() {
		User user = User.builder()
			.userNickname(userNickname)
			.userLoginId(userLoginId)
			.userPassword(userPassword)
			.userEmail(userEmail)
			.userGoogleId("")
			.userImgUrl("비어있음")
			.userBio("비어있음")
			.userNativeLanguage(userNativeLanguage)
			.userMileage(0)
			.userTotalMileage(0)
			.userRating(0)
			.userTotalRating(0)
			.userStudyCount(0)
			.userComplain(0)
			.userState(ACTIVE)
			.userPassportStyle(1)
			.build();

		if (userInterestLanguageList != null) {
			for (LanguageWithGrade languageWithGrade : userInterestLanguageList) {
				Language language = languageWithGrade.getLanguage();
				Grade grade = languageWithGrade.getGrade();
				UserLanguage userLanguage = UserLanguage.builder()
					.user(user)
					.language(language)
					.grade(grade)
					.build();
				user.addUserLanguage(userLanguage);
			}
		} else {
			// null 처리
		}

		return user;
	}
}