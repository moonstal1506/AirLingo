package com.ssafy.airlingo.domain.user.dto.request;

import java.util.List;

import com.ssafy.airlingo.domain.language.dto.response.LanguageDto;
import com.ssafy.airlingo.domain.language.entity.Language;
import com.ssafy.airlingo.domain.user.entity.User;
import com.ssafy.airlingo.domain.user.entity.UserState;

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
public class UserRequestDto {
	private long userId;
	private String userNickname;
	private String userLoginId;
	private String userGoogleId;
	private String userPassword;
	private String userEmail;
	private String userImgUrl;
	private String userBio;
	private int userMileage;
	private int userTotalMileage;
	private double userRating;
	private double userTotalRating;
	private int userStudyCount;
	private int userComplain;
	private int userPassportStyle;
	private UserState userState;
	private Language userNativeLanguage;
	private List<LanguageDto> userLanguages;

	public User toEntity(){
		return User.builder()
			.userId(this.userId)
			.userNickname(this.userNickname)
			.userLoginId(this.userLoginId)
			.userGoogleId(this.userGoogleId)
			.userPassword(this.userPassword)
			.userEmail(this.userEmail)
			.userImgUrl(this.userImgUrl)
			.userBio(this.userBio)
			.userMileage(this.userMileage)
			.userRating(this.userRating)
			.userTotalRating(this.userTotalRating)
			.userStudyCount(this.userStudyCount)
			.userComplain(this.userComplain)
			.userPassportStyle(this.userPassportStyle)
			.userState(this.userState)
			.userNativeLanguage(this.userNativeLanguage)
			.build();
	}
}
