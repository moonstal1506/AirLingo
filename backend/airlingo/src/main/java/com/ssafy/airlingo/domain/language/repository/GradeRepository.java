package com.ssafy.airlingo.domain.language.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.airlingo.domain.language.entity.Grade;

public interface GradeRepository extends JpaRepository<Grade, Integer> {
	Grade findByGradeName(String gradeName);
}
