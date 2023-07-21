package com.ssafy.airlingo.domain.user.repository;

import java.util.List;

import com.ssafy.airlingo.domain.study.entity.Study;
import com.ssafy.airlingo.domain.user.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.airlingo.domain.language.entity.Record;

public interface RecordRepository extends JpaRepository<Record, Long> {

	List<Record> findByUser(User user);

	@EntityGraph(attributePaths = {"user", "language", "grade", "study"})
	List<Record> findRecordByUser(User user);
}

