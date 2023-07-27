package com.ssafy.airlingo.domain.study.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafy.airlingo.domain.study.dto.response.StudyResponseDto;
import com.ssafy.airlingo.domain.study.entity.Study;
import com.ssafy.airlingo.domain.study.entity.UserStudy;
import com.ssafy.airlingo.domain.study.repository.StudyRepository;
import com.ssafy.airlingo.domain.study.repository.UserStudyRepository;
import com.ssafy.airlingo.domain.user.entity.User;
import com.ssafy.airlingo.domain.user.repository.UserRepository;
import com.ssafy.airlingo.global.exception.NotExistAccountException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class StudyServiceImpl implements StudyService {

	private final UserRepository userRepository;
	private final StudyRepository studyRepository;
	private final UserStudyRepository userStudyRepository;

	@Override
	public List<StudyResponseDto> findStudyByUserIdAndDate(Long userId, LocalDate createdDate) {
		User user = userRepository.findById(userId).orElseThrow(() -> new NotExistAccountException("존재하지 않는 아이디 입니다."));
		List<UserStudy> userStudys = userStudyRepository.findUserStudyByUserIdAndCreatedDate(userId,createdDate);
		List<StudyResponseDto> studyList = new ArrayList<>();

		for (UserStudy userStudy : userStudys) {
			Study study = userStudy.getStudy();
			Long partnerId = userStudyRepository.findPartnerByStudyAndUser(study.getStudyId(), userId);
			String userNickname = userRepository.findById(partnerId).get().getUserNickname();
				studyList.add(study.toDto(userNickname,userStudy.getLanguage()));
		}
		return studyList;
	}

}
