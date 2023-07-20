package com.ssafy.airlingo.domain.language.entity;

import com.ssafy.airlingo.domain.user.entity.User;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user_language")
@Entity
@Setter
public class UserLanguage {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long userLanguageId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "language_id", nullable = false)
	private Language language;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "grade_id", nullable = false)
	private Grade grade;

	// User와 관련된 필드들에 대한 생성자 추가
	public UserLanguage(User user, Language language, Grade grade) {
		this.user = user;
		this.language = language;
		this.grade = grade;
	}
}
