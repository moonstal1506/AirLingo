package com.ssafy.airlingo.domain.user.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.airlingo.domain.user.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	// 입력받은 ID, PW를 기반으로 User 조회
	User findUserByUserLoginIdAndUserPassword(String userLoginId, String userPassword);

	// Fetch Join을 사용하여 User 엔티티와 연관된 userLanguages 정보도 함께 조회
	@EntityGraph(attributePaths = {"language"})
	User findByUserId(Long userId);
}
