package com.ssafy.airlingo.global.util;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import com.ssafy.airlingo.domain.report.entity.ReportItem;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class InitDb {

	private final InitService initService;

	   @PostConstruct
	   public void init() {
	       initService.reportItemInit();
	   }

	@Component
	@Transactional
	@RequiredArgsConstructor
	static class InitService {

		private final EntityManager em;

		/**
		 *  신고항목 초기화
		 */
		public void reportItemInit() {

			ReportItem r1 = ReportItem.builder()
				.reportItemKor("욕설 또는 공격적인 언어")
				.reportItemEng("Profanity or Offensive Language")
				.build();

			ReportItem r2 = ReportItem.builder()
				.reportItemKor("부적절한 행동")
				.reportItemEng("Hateful Behavior")
				.build();

			ReportItem r3 = ReportItem.builder()
				.reportItemKor("부적절한 콘텐츠")
				.reportItemEng("Inappropriate Content")
				.build();

			ReportItem r4 = ReportItem.builder()
				.reportItemKor("스팸 또는 원치 않는 메시지")
				.reportItemEng("Spam or Unwanted Messages")
				.build();

			ReportItem r5 = ReportItem.builder()
				.reportItemKor("저작권 침해 ")
				.reportItemEng("Copyright Infringement")
				.build();

			ReportItem r6 = ReportItem.builder()
				.reportItemKor("사칭")
				.reportItemEng("Impersonation")
				.build();

			ReportItem r7 = ReportItem.builder()
				.reportItemKor("기타(위 범주에 포함되지 않는 기타 문제의 경우)")
				.reportItemEng("ETC")
				.build();

			em.persist(r1);
			em.persist(r2);
			em.persist(r3);
			em.persist(r4);
			em.persist(r5);
			em.persist(r6);
			em.persist(r7);
		}
	}
}
