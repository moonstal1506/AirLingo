package com.ssafy.airlingo.domain.report.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.airlingo.domain.report.dto.response.ReportItemResponseDto;
import com.ssafy.airlingo.domain.report.entity.ReportItem;
import com.ssafy.airlingo.domain.report.repository.ReportItemRepository;
import com.ssafy.airlingo.domain.report.repository.ReportRepository;
import com.ssafy.airlingo.global.entity.LanguageCode;
import com.ssafy.airlingo.global.exception.IncorrectLanguageCodeException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ReportService {

	private final ReportItemRepository reportItemRepository;

	public List<ReportItemResponseDto> getReportItemList(String languageCode){
		log.info("ReportService_getReportItemList || 모든 신고 항목 조회");

		if (!languageCode.equals(LanguageCode.KOR.toString()) && !languageCode.equals(LanguageCode.ENG.toString()))
			throw new IncorrectLanguageCodeException();

		return reportItemRepository.findAll().stream()
			.map(r -> r.toReportItemResponseDto(languageCode)).collect(Collectors.toList());
	}
}
