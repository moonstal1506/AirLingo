package com.ssafy.airlingo.domain.language.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.airlingo.domain.language.entity.Grade;

@Repository
public interface GradeRepository extends JpaRepository<Grade, Long> {
	Grade findByGradeName(String gradeName);

	Grade findByGradeId(Long gradeId);
}
