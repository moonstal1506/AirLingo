package com.ssafy.airlingo.domain.report.service;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import com.ssafy.airlingo.global.exception.IncorrectLanguageCodeException;

@SpringBootTest
class ReportServiceImplTest {

	@Autowired
	private ReportServiceImpl reportService;

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
	void 메서드명() {
	    // given

	    // when

	    // then
	}

}