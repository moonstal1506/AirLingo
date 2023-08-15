package com.ssafy.airlingo.domain.user.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.airlingo.domain.study.entity.UserStudy;
import com.ssafy.airlingo.domain.user.entity.DailyGrid;
import com.ssafy.airlingo.domain.user.entity.User;

import lombok.extern.slf4j.Slf4j;

@Repository
public interface DailyGridRepository extends JpaRepository<DailyGrid, Long> {
	List<DailyGrid> findDailyGridByUser(User user);

	@Query(value = "SELECT * FROM daily_grid "
		+ "WHERE DATE_FORMAT(created_date, '%Y-%m-%d') = :createdDate "
		+ "AND user_id = :userId", nativeQuery = true)
	DailyGrid findDailyGridByUserIdAndCreatedDate(
		@org.springframework.data.repository.query.Param("userId") Long userId,
		@Param("createdDate") LocalDate createdDate);
}
