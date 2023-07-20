package com.ssafy.airlingo.domain.content.service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.airlingo.domain.content.dto.request.CardRequestDto;
import com.ssafy.airlingo.domain.content.dto.response.CardResponseDto;
import com.ssafy.airlingo.domain.content.entity.CardCode;
import com.ssafy.airlingo.domain.content.repository.CardRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CardService {

	private CardRepository cardRepository;

	public CardResponseDto getCard(CardRequestDto cardRequestDto){
		log.info("CardService_getCard || 대화 대주제에 따른 대화 소주제 랜덤 반환 ");
		return cardRepository.findAllByCardCode(cardRequestDto.getCardCode())
			.stream().findAny().get()
			.toCardResponseDto(cardRequestDto.getLanguageCode());
	}

	public List<CardCode> getCardCodeList(){
		log.info("CardService_getCardCodeList || 모든 대화 대주제 반환 ");
		return Stream.of(CardCode.values()).collect(Collectors.toList());
	}

}
