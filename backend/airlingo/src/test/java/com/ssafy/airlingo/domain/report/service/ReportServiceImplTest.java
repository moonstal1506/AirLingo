package com.ssafy.airlingo.domain.report.service;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.ssafy.airlingo.domain.report.dto.request.ReportUserRequestDto;
import com.ssafy.airlingo.domain.user.entity.User;
import com.ssafy.airlingo.domain.user.repository.UserRepository;
import com.ssafy.airlingo.global.exception.IncorrectLanguageCodeException;

@SpringBootTest
class ReportServiceImplTest {

	@Autowired
	private ReportServiceImpl reportService;

	@Autowired
	private UserRepository userRepository;

	@Test
	@DisplayName("신고항목을 조회할때 올바르지 않은 언어 코드를 사용하면 예외가 발생한다.")
	void inCorrectLanguageCodeThrowExceptionTest() {
	    // given
		String correctLanguageCode = "KOR";
		String inCorrectLanguageCode = "INC";


	    // when // then
		//예외가 발생하지 않으면 TRUE
		assertDoesNotThrow(() -> reportService.getReportItemList(correctLanguageCode));

		//예외가 발생하고 어떤 예외가 발생한지 확인
		assertThatThrownBy(() -> reportService.getReportItemList(inCorrectLanguageCode))
			.isInstanceOf(IncorrectLanguageCodeException.class);
	}

	@Test
	@DisplayName("유저 신고기능이 올바르게 동작하는지 테스트")
	void reportUserTest() {
	    // given
		ReportUserRequestDto report = ReportUserRequestDto.builder()
			.userId(1L)
			.reportItemId(1L)
			.description("패드립 당했어요")
			.build();

		// when
		Long reportId = reportService.reportUser(report);

		// then
		assertThat(reportId).isGreaterThan(0L);
	}

	@Test
	@DisplayName("유저가 신고를 당하면 complain이 1증가 하여야 한다.")
	void userComplaintCountTest() {
		// given
		ReportUserRequestDto report = ReportUserRequestDto.builder()
			.userId(1L)
			.reportItemId(1L)
			.description("패드립 당했어요")
			.build();

		User user = userRepository.findById(1L).get();
		int beforeUserComplainCount = user.getUserComplain();

		// when
		reportService.reportUser(report);

		// then
		assertThat(beforeUserComplainCount+1).isEqualTo(userRepository.findById(1L).get().getUserComplain());
	}

}