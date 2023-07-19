package com.ssafy.airlingo.domain.user.repository;

import org.springframework.stereotype.Repository;

import com.ssafy.airlingo.domain.user.entity.User;

@Repository
public interface UserRepository {
	int createUserAccount(User user);
}
