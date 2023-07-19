package com.ssafy.airlingo.domain.user.entity;

import java.util.List;

import com.ssafy.airlingo.domain.language.entity.UserLanguage;
import com.ssafy.airlingo.global.entity.BaseTimeEntity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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

	@Column(nullable = false, unique = true)
	private String userGoogleId;

	@Column(nullable = false)
	private String userPassword;

	@Column(nullable = false, unique = true, length = 100)
	private String userEmail;

	@Column(nullable = false, length = 100)
	private String userImgUrl;

	@Column(length = 100)
	private String userBio;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<UserLanguage> userNativeLanguage;

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
	@Enumerated(EnumType.STRING)
	private UserState userState; //회원상태 뭐있는지

	@Column(nullable = false)
	private int userPassportStyle;
}