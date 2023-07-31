package com.ssafy.airlingo.domain.language.repository;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ssafy.airlingo.domain.language.dto.response.LearningLanguageNumberResponseDto;
import com.ssafy.airlingo.domain.language.dto.response.LearningLanguageTimeResponseDto;
import com.ssafy.airlingo.domain.language.entity.Record;
import com.ssafy.airlingo.domain.user.entity.User;

@Repository
public interface RecordRepository extends JpaRepository<Record, Long> {

	@Query("SELECT new com.ssafy.airlingo.domain.language.dto.response.LearningLanguageTimeResponseDto(" +
		"l.languageId, " +
		"l.languageKorName, " +
		"ROUND(SUM(s.studyTime) * 100 / (SELECT SUM(s.studyTime) FROM Study s)), " +
		"SUM(s.studyTime) " +
		") " +
		"FROM Record r " +
		"JOIN r.study s " +
		"JOIN r.language l " +
		"WHERE r.user= :user " +
		"GROUP BY l.languageId")
	List<LearningLanguageTimeResponseDto> getLearningLanguageTimeStatistics(User user);

	@Query("SELECT new com.ssafy.airlingo.domain.language.dto.response.LearningLanguageNumberResponseDto(" +
		"l.languageId, " +
		"l.languageKorName, " +
		"ROUND(COUNT(l.languageId) * 100 / (SELECT COUNT(r) FROM Record r)), " +
		"COUNT(l.languageId) " +
		") " +
		"FROM Record r " +
		"JOIN r.language l " +
		"WHERE r.user = :user " +
		"GROUP BY l.languageId ")
	List<LearningLanguageNumberResponseDto> getLearningLanguageNumberStatistics(User user);

	@EntityGraph(attributePaths = {"user", "language", "grade", "study"})
	List<Record> findRecordByUser(User user);
}
