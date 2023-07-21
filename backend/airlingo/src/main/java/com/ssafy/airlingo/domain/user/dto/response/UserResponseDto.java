package com.ssafy.airlingo.domain.user.dto.response;

import java.util.List;

import com.ssafy.airlingo.domain.language.dto.LanguageDto;
import com.ssafy.airlingo.domain.language.entity.Language;
import com.ssafy.airlingo.domain.language.entity.UserLanguage;
import com.ssafy.airlingo.domain.user.entity.UserState;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserResponseDto {
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
	private int userRating;
	private int userTotalRating;
	private int userStudyCount;
	private int userComplain;
	private int userPassportStyle;
	private UserState userState;
	private Language userNativeLanguage;
	private List<LanguageDto> userLanguages;

}
