package com.ssafy.airlingo.domain.study.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.airlingo.domain.study.entity.Study;

public interface StudyRepository extends JpaRepository<Study, Long> {
}
