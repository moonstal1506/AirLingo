package com.ssafy.airlingo.domain.content.service;

import java.util.*;
import java.util.stream.Collectors;
import com.ssafy.airlingo.domain.content.dto.response.CardCodeResponseDto;
import com.ssafy.airlingo.domain.content.entity.Card;
import org.springframework.stereotype.Service;

import com.ssafy.airlingo.domain.content.dto.response.CardResponseDto;
import com.ssafy.airlingo.domain.content.entity.CardCode;
import com.ssafy.airlingo.domain.content.repository.CardRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class CardServiceImpl {

	private final CardRepository cardRepository;

	public CardResponseDto getCard(String stringCardCode , String languageCode){
		log.info("CardService_getCard || 대화 대주제에 따른 대화 소주제 랜덤 반환 ");

		CardCode cardCode = Arrays.stream(CardCode.values())
			.filter(c -> c.name().equals(stringCardCode))
			.findAny().get();

		List<Card> cardList = cardRepository.findAllByCardCode(cardCode);
		Collections.shuffle(cardList);
		return cardList.get(0).toCardResponseDto(languageCode);
	}

	public List<CardCodeResponseDto> getCardCodeList(){
		log.info("CardService_getCardCodeList || 모든 대화 대주제 반환 ");
		return Arrays.stream(CardCode.values()).map(cardCode -> cardCode.toCardCodeResponseDto()).collect(Collectors.toList());
	}
}

