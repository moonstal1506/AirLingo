package com.ssafy.airlingo.domain.language.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ssafy.airlingo.domain.language.dto.request.EvaluateUserRequestDto;
import com.ssafy.airlingo.domain.language.dto.response.LearningLanguageResponseDto;
import com.ssafy.airlingo.domain.language.dto.response.LearningTimeResponseDto;
import com.ssafy.airlingo.domain.language.entity.Grade;
import com.ssafy.airlingo.domain.language.entity.Language;
import com.ssafy.airlingo.domain.language.entity.Record;
import com.ssafy.airlingo.domain.language.repository.GradeRepository;
import com.ssafy.airlingo.domain.language.repository.LanguageRepository;
import com.ssafy.airlingo.domain.study.entity.Study;
import com.ssafy.airlingo.domain.study.repository.StudyRepository;
import com.ssafy.airlingo.domain.user.entity.User;
import com.ssafy.airlingo.domain.user.repository.RecordRepository;
import com.ssafy.airlingo.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class RecordServiceImpl implements RecordService {

	private final RecordRepository recordRepository;
	private final UserRepository userRepository;
	private final LanguageRepository languageRepository;
	private final GradeRepository gradeRepository;
	private final StudyRepository studyRepository;

	@Override
	public boolean evaluateUser(EvaluateUserRequestDto evaluateUserRequestDto) {
		log.info("RecordServiceImpl_evaluateUser || 유저 실력/별점(매너) 평가");

		User evaluatedUser = userRepository.findById(evaluateUserRequestDto.getUserId()).get();
		Language language = languageRepository.findById(evaluateUserRequestDto.getLanguageId()).get();
		Grade grade = gradeRepository.findById(evaluateUserRequestDto.getGradeId()).get();
		Study study = studyRepository.findById(evaluateUserRequestDto.getStudyId()).get();
		recordRepository.save(createNewRecordAndRenewUserRating(evaluatedUser, language, grade, study,
			evaluateUserRequestDto.getRating()));

		return true;
	}

	@Override
	public Record createNewRecordAndRenewUserRating(User user, Language language, Grade grade, Study study,
		float rating) {
		log.info("RecordServiceImpl_createNewRecordAndRenewUserRating || 평가 기록 생성 및 평가 기록 유저에 반영");
		user.renewRatingAndStudyCount(rating);
		return Record.createNewRecord(user, language, grade, study);
	}

	@Override
	public LearningTimeResponseDto findLearningTimeByUser(Long userId) {
		User user = userRepository.findById(userId).get();
		List<Record> records = recordRepository.findRecordWithUserAndLanguageAndStudyByUser(user);

		int totalTime = records.stream().mapToInt(record -> record.getStudy().getStudyTime()).sum();
		List<LearningLanguageResponseDto> learningLanguageResponseDtoList = records.stream().map(record -> LearningLanguageResponseDto.builder()
				.languageId(record.getLanguage().getLanguageId())
				.languageName(record.getLanguage().getLanguageKorName())
				.percent(String.format("%.1f", record.getStudy().getStudyTime() / (double)totalTime))
				.build())
			.collect(Collectors.toList());

		return LearningTimeResponseDto.builder()
			.learningLanguageResponseList(learningLanguageResponseDtoList)
			.totalStudyTime(totalTime)
			.build();
	}
}
