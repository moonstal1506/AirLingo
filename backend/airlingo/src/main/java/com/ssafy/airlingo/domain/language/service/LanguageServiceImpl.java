package com.ssafy.airlingo.domain.language.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ssafy.airlingo.domain.language.dto.response.GradeDto;
import com.ssafy.airlingo.domain.language.dto.response.LanguageDto;
import com.ssafy.airlingo.domain.language.entity.Grade;
import com.ssafy.airlingo.domain.language.entity.Language;
import com.ssafy.airlingo.domain.language.repository.GradeRepository;
import com.ssafy.airlingo.domain.language.repository.LanguageRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class LanguageServiceImpl implements LanguageService {

	private final LanguageRepository languageRespository;
	private final GradeRepository gradeRespository;

	@Override
	public List<LanguageDto> getLanguageList() {
		List<Language> languageList = languageRespository.findAll();
		log.info("LanguageServiceImpl_getLanguageList -> DB에서 언어 가져옴");
		return languageList.stream()
			.map(Language::toLanguageDto)
			.collect(Collectors.toList());
	}

	@Override
	public List<GradeDto> getGradeList() {
		List<Grade> gradeList = gradeRespository.findAll();
		log.info("LanguageServiceImpl_getGradeList -> DB에서 등급 가져옴");
		return gradeList.stream()
			.map(Grade::toGradeDto)
			.collect(Collectors.toList());
	}
}
