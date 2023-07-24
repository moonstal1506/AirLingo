package com.ssafy.airlingo.domain.user.entity;

import java.util.List;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.airlingo.domain.language.dto.request.LanguageDto;
import com.ssafy.airlingo.domain.language.entity.Language;
import com.ssafy.airlingo.domain.language.entity.UserLanguage;
import com.ssafy.airlingo.domain.user.dto.response.UserResponseDto;
import com.ssafy.airlingo.global.entity.BaseTimeEntity;

import jakarta.persistence.*;
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
	private double userRating;

	@Column(nullable = false)
	private double userTotalRating;

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

	public UserResponseDto toDto() {
		return UserResponseDto.builder()
			.userId(this.getUserId())
			.userNickname(this.getUserNickname())
			.userLoginId(this.getUserLoginId())
			.userGoogleId(this.getUserGoogleId())
			.userPassword(this.getUserPassword())
			.userEmail(this.getUserEmail())
			.userImgUrl(this.getUserImgUrl())
			.userBio(this.getUserBio())
			.userNativeLanguage(this.getUserNativeLanguage())
			.userMileage(this.getUserMileage())
			.userTotalMileage(this.getUserTotalMileage())
			.userRating(this.getUserRating())
			.userTotalRating(this.getUserTotalRating())
			.userStudyCount(this.getUserStudyCount())
			.userComplain(this.getUserComplain())
			.userState(this.getUserState())
			.userPassportStyle(this.getUserPassportStyle())
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

	public void addComplainCount() {
		this.userComplain += 1;
	}

	public void renewRatingAndStudyCount(float rating){
		userTotalRating += rating;
		userStudyCount += 1;
		userRating = userTotalRating/userStudyCount;
	}
}