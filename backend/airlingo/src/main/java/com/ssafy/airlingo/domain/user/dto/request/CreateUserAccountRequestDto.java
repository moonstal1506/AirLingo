package com.ssafy.airlingo.domain.user.dto.request;

import java.util.ArrayList;
import java.util.List;

import com.ssafy.airlingo.domain.language.entity.Grade;
import com.ssafy.airlingo.domain.language.entity.Language;
import com.ssafy.airlingo.domain.language.entity.UserLanguage;
import com.ssafy.airlingo.domain.language.repository.GradeRepository;
import com.ssafy.airlingo.domain.language.repository.LanguageRepository;
import com.ssafy.airlingo.domain.user.entity.User;
import com.ssafy.airlingo.domain.user.entity.UserState;
import com.ssafy.airlingo.global.exception.NotFoundGradeException;
import com.ssafy.airlingo.global.exception.NotFoundLanguageException;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
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
@Schema(description = "(CreateUserAccountRequestDto) 회원가입 요청 DTO")
public class CreateUserAccountRequestDto {

	@NotBlank
	@Schema(description = "사용자 닉네임", example = "에어링고")
	private String userNickname;

	@NotBlank
	@Schema(description = "사용자 로그인 ID", example = "airlingo")
	private String userLoginId;

	@NotBlank
	@Schema(description = "사용자 비밀번호", example = "airlingo")
	private String userPassword;

	@Email
	@Schema(description = "사용자 이메일", example = "airlingo@gmail.com")
	private String userEmail;

	@Schema(description = "사용자 모국어 ID", example = "1")
	private Long userNativeLanguageId;

	@Schema(description = "사용자 관심언어와 해당 언어의 등급")
	private List<LanguageWithGradeDto> userInterestLanguageList;

	public User toUserEntity(LanguageRepository languageRepository, GradeRepository gradeRepository)
		throws NotFoundLanguageException, NotFoundGradeException {
		User user = User.builder()
			.userNickname(userNickname)
			.userLoginId(userLoginId)
			.userPassword(userPassword)
			.userEmail(userEmail)
			.userGoogleId("")
			.userImgUrl(
				"https://airlingobucket.s3.ap-northeast-2.amazonaws.com/322cbe51-5407-44f4-aa9d-08676f3a4e5d.png")
			.userBio("")
			.userNativeLanguage(Language.builder().languageId(userNativeLanguageId).build())
			.userMileage(0)
			.userTotalMileage(0)
			.userRating(0)
			.userTotalRating(0)
			.userStudyCount(0)
			.userComplain(0)
			.userState(UserState.ACTIVE)
			.userPassportStyle(1)
			.userLanguages(new ArrayList<>())
			.build();

		if (userInterestLanguageList != null) {
			for (LanguageWithGradeDto languageWithGradeDto : userInterestLanguageList) {

				Long languageId = languageWithGradeDto.getLanguageId();
				Long gradeId = languageWithGradeDto.getGradeId();

				Language language = languageRepository.findByLanguageId(languageId);
				Grade grade = gradeRepository.findByGradeId(gradeId);
				languageRepository.save(language);
				gradeRepository.save(grade);

				UserLanguage userLanguage = UserLanguage.builder()
					.user(user)
					.language(language)
					.grade(grade)
					.build();
				user.addUserLanguage(userLanguage);
			}
		} else {
			throw new NotFoundLanguageException();
		}

		return user;
	}
}
