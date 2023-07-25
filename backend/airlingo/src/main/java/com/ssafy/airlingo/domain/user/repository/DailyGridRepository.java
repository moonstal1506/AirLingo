package com.ssafy.airlingo.domain.user.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ssafy.airlingo.domain.user.entity.DailyGrid;
import com.ssafy.airlingo.domain.user.entity.User;

import io.lettuce.core.dynamic.annotation.Param;
import lombok.extern.slf4j.Slf4j;

@Repository
public interface DailyGridRepository extends JpaRepository<DailyGrid, Long> {
	List<DailyGrid> findDailyGridByUser(User user);
}
