package com.ssafy.airlingo.domain.content.service;

import java.util.List;

import com.ssafy.airlingo.domain.content.dto.response.CardCodeResponseDto;
import com.ssafy.airlingo.domain.content.dto.response.CardResponseDto;

public interface CardService {
	CardResponseDto getCard(String stringCardCode, String languageCode);

	List<CardCodeResponseDto> getCardCodeList();
}
