package com.ssafy.airlingo.domain.language.repository;

import com.ssafy.airlingo.domain.language.entity.Language;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LanguageRepository extends JpaRepository<Language, Integer> {
}
