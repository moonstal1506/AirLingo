package com.ssafy.airlingo.domain.user.repository;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.airlingo.domain.user.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

	// Fetch Join을 사용하여 User 엔티티와 연관된 userLanguages 정보도 함께 조회
	@EntityGraph(attributePaths = { "userLanguages.language" })
	User findByUserId(Long userId);

}
