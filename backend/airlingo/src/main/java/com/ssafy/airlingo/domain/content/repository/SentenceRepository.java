package com.ssafy.airlingo.domain.content.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.airlingo.domain.content.entity.Sentence;

public interface SentenceRepository extends JpaRepository<Sentence, Long> {
}
