package com.ssafy.airlingo.domain.user.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.airlingo.domain.user.entity.User;
import com.ssafy.airlingo.domain.user.entity.Word;

@Repository
public interface WordRepository extends JpaRepository<Word, Long> {
	List<Word> findByUser(User user);

	Word findByUserAndWordId(User user, Long wordId);
}
