package com.ssafy.airlingo.domain.language.repository;

import com.ssafy.airlingo.domain.language.entity.Language;
import com.ssafy.airlingo.domain.language.entity.UserLanguage;
import com.ssafy.airlingo.domain.user.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserLanguageRepository extends JpaRepository<UserLanguage, Long> {
	UserLanguage findByUserAndLanguage(User user, Language studyLanguage);

	void deleteByUserAndLanguage(User user, Language language);
}
