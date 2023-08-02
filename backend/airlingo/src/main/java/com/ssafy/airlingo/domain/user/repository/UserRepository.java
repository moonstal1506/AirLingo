package com.ssafy.airlingo.domain.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.airlingo.domain.user.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	// 입력받은 ID, PW를 기반으로 User 조회
	Optional<User> findUserByUserLoginIdAndUserPassword(String userLoginId, String userPassword);
}
