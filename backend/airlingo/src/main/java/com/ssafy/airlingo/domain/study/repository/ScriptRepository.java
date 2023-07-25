package com.ssafy.airlingo.domain.study.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.airlingo.domain.study.entity.Script;
import com.ssafy.airlingo.domain.user.entity.User;

@Repository
public interface ScriptRepository extends JpaRepository<Script, Long> {
	List<Script> findScriptsByUser_UserId(Long userId);
	List<Script> findScriptsByUser_UserIdAndCreatedDate(Long userId, LocalDateTime createdDate);
}
