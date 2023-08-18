package com.ssafy.airlingo.domain.content.service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import com.ssafy.airlingo.domain.language.dto.response.LanguageDto;
import org.springframework.stereotype.Service;

import com.ssafy.airlingo.domain.content.dto.response.CardCodeResponseDto;
import com.ssafy.airlingo.domain.content.dto.response.CardResponseDto;
import com.ssafy.airlingo.domain.content.dto.response.SentenceResponseDto;
import com.ssafy.airlingo.domain.content.entity.Card;
import com.ssafy.airlingo.domain.content.entity.CardCode;
import com.ssafy.airlingo.domain.content.entity.Sentence;
import com.ssafy.airlingo.domain.content.repository.CardRepository;
import com.ssafy.airlingo.domain.content.repository.SentenceRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class SentenceServiceImpl implements SentenceService {

	private final SentenceRepository sentenceRepository;

	@Override
	public List<SentenceResponseDto> getSentence() {
		log.info("SentenceService_getSentence");
		List<Sentence> sentences = sentenceRepository.findAll();
		return sentences.stream().map(sentence ->sentence.toSentenceResponseDto()).collect(Collectors.toList());
	}
}

