package com.ssafy.airlingo.domain.study.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ssafy.airlingo.domain.study.entity.UserStudy;

public interface UserStudyRepository extends JpaRepository<UserStudy, Long> {

	@Query(value = "SELECT user_id FROM user_study "
		+ "WHERE study_id = :studyId "
		+ "AND user_id != :userId", nativeQuery = true)
	Long findPartnerByStudyAndUser(Long studyId, Long userId);

	@Query(value = "SELECT * FROM user_study "
		+ "WHERE DATE_FORMAT(created_date, '%Y-%m-%d') = :createdDate "
		+ "AND user_id = :userId", nativeQuery = true)
	List<UserStudy> findUserStudyByUserIdAndCreatedDate(Long userId, LocalDate createdDate);
}
