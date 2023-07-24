package com.ssafy.airlingo.domain.language.service;

import com.ssafy.airlingo.domain.language.dto.request.EvaluateUserRequestDto;
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
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class RecordServiceImpl implements RecordService{

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
        recordRepository.save(createNewRecordAndRenewUserRating(evaluatedUser,language,grade,study,evaluateUserRequestDto.getRating()));

        return true;
    }

    @Override
    public Record createNewRecordAndRenewUserRating(User user, Language language, Grade grade, Study study, float rating) {
        log.info("RecordServiceImpl_createNewRecordAndRenewUserRating || 평가 기록 생성 및 평가 기록 유저에 반영");
        user.renewRatingAndStudyCount(rating);
        return Record.createNewRecord(user,language,grade,study);
    }


}
