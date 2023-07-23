package com.ssafy.airlingo.domain.user.entity;

import java.util.List;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.airlingo.domain.language.dto.request.LanguageDto;
import com.ssafy.airlingo.domain.language.entity.Language;
import com.ssafy.airlingo.domain.language.entity.UserLanguage;
import com.ssafy.airlingo.domain.user.dto.response.LoginResponseDto;
import com.ssafy.airlingo.domain.user.dto.response.UserResponseDto;
import com.ssafy.airlingo.global.entity.BaseTimeEntity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AttributeOverride(name = "createdDate", column = @Column(name = "user_created_date"))
@AttributeOverride(name = "modifiedDate", column = @Column(name = "user_modified_date"))
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User extends BaseTimeEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long userId;

	@Column(nullable = false, unique = true, length = 100)
	private String userNickname;

	@Column(nullable = false, unique = true, length = 100)
	private String userLoginId;

	@Column()
	private String userGoogleId;

	@Column(nullable = false)
	private String userPassword;

	@Column(nullable = false, unique = true, length = 100)
	private String userEmail;

	@Column(length = 100)
	private String userImgUrl;

	@Column(length = 100)
	private String userBio;

	@Column(nullable = false)
	private int userMileage;

	@Column(nullable = false)
	private int userTotalMileage;

	@Column(nullable = false)
	private int userRating;

	@Column(nullable = false)
	private int userTotalRating;

	@Column(nullable = false)
	private int userStudyCount;

	@Column(nullable = false)
	private int userComplain;

	@Column(nullable = false)
	private int userPassportStyle;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private UserState userState;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "language_id", nullable = false)
	private Language userNativeLanguage;

	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
	private List<UserLanguage> userLanguages;

	public LoginResponseDto toLoginResponseDto() {
		return LoginResponseDto.builder()
			.userId(userId)
			.userLoginId(userLoginId)
			.userNickname(userNickname)
			.build();
	}

	public UserResponseDto toDto() {
		return UserResponseDto.builder()
			.userId(userId)
			.userNickname(userNickname)
			.userLoginId(userLoginId)
			.userGoogleId(userGoogleId)
			.userPassword(userPassword)
			.userEmail(userEmail)
			.userImgUrl(userImgUrl)
			.userBio(userBio)
			.userNativeLanguage(userNativeLanguage)
			.userMileage(userMileage)
			.userTotalMileage(userTotalMileage)
			.userRating(userRating)
			.userTotalRating(userTotalRating)
			.userStudyCount(userStudyCount)
			.userComplain(userComplain)
			.userState(userState)
			.userPassportStyle(userPassportStyle)
			.userLanguages(this.getUserLanguages().stream()
				.map(userLanguage -> new LanguageDto(userLanguage.getLanguage()))
				.collect(Collectors.toList())
			)
			.build();
	}

	public void addUserLanguage(UserLanguage userLanguage) {
		userLanguages.add(userLanguage);
		userLanguage.setUser(this);
	}

	public void removeUserLanguage(UserLanguage userLanguage) {
		userLanguages.remove(userLanguage);
		userLanguage.setUser(null);
	}
}