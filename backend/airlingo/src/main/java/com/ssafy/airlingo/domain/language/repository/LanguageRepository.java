package com.ssafy.airlingo.domain.language.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.airlingo.domain.language.entity.Language;

public interface LanguageRepository extends JpaRepository<Language, Integer> {
	Language findByLanguageId(int languageId);
}
