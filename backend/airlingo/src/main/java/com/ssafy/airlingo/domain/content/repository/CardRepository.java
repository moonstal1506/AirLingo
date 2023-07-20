package com.ssafy.airlingo.domain.content.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.airlingo.domain.content.entity.Card;
import com.ssafy.airlingo.domain.content.entity.CardCode;

public interface CardRepository extends JpaRepository<Card, Long> {
	public List<Card> findAllByCardCode(CardCode cardCode);
}
