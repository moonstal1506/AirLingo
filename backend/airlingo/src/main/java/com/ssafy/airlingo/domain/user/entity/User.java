package com.ssafy.airlingo.domain.user.entity;

import java.util.ArrayList;
import java.util.List;

import com.ssafy.airlingo.domain.language.entity.Language;
import com.ssafy.airlingo.domain.language.entity.UserLanguage;
import com.ssafy.airlingo.global.entity.BaseTimeEntity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AttributeOverride(name = "createdDate", column = @Column(name = "user_created_date"))
@AttributeOverride(name = "modifiedDate", column = @Column(name = "user_modified_date"))
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user")
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

	@Column(nullable = false, length = 100)
	private String userImgUrl;

	@Column(length = 100)
	private String userBio;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "language_id", nullable = false)
	private Language userNativeLanguage;

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
	private UserState userState;

	@Column(nullable = false)
	private int userPassportStyle;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<UserLanguage> userLanguages = new ArrayList<>();

	public void addUserLanguage(UserLanguage userLanguage) {
		userLanguages.add(userLanguage);
		userLanguage.setUser(this);
	}

	public void removeUserLanguage(UserLanguage userLanguage) {
		userLanguages.remove(userLanguage);
		userLanguage.setUser(null);
	}
}