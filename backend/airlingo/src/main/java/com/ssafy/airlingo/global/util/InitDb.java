package com.ssafy.airlingo.global.util;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.airlingo.domain.content.entity.Card;
import com.ssafy.airlingo.domain.content.entity.CardCode;
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
		   initService.CardInit();
	   }

	@Component
	@Transactional
	@RequiredArgsConstructor
	static class InitService {

		private final EntityManager em;

		public void CardInit(){
			Card cf1 = Card.builder()
				.cardCode(CardCode.FOOD)
				.cardKor("좋아하는 요리나 음식 종류가 있으신가요?")
				.cardEng("eng")
				.build();

			Card cf2 = Card.builder()
				.cardCode(CardCode.FOOD)
				.cardKor("자주 요리하시나요? 가장 자신 있는 요리는 무엇인가요?")
				.cardEng("eng2")
				.build();

			Card ct1 = Card.builder()
				.cardCode(CardCode.TRAVEL)
				.cardKor("가장 기억에 남는 여행 경험을 한 번 공유해 주실 수 있나요?")
				.cardEng("eng")
				.build();

			Card ct2 = Card.builder()
				.cardCode(CardCode.TRAVEL)
				.cardKor("여행지를 선택할 때 예산, 문화, 자연 등 어떤 점을 고려하시나요?")
				.cardEng("eng2")
				.build();

			Card cw1 = Card.builder()
				.cardCode(CardCode.WEATHER)
				.cardKor("오늘 날씨가 어떤가요?")
				.cardEng("eng")
				.build();

			Card cw2 = Card.builder()
				.cardCode(CardCode.WEATHER)
				.cardKor("오늘 날씨가 어떤가요?")
				.cardEng("eng2")
				.build();

			Card ch1 = Card.builder()
				.cardCode(CardCode.HOBBY)
				.cardKor("가장 좋아하는 취미가 무엇인가요? 어떤 매력 때문에 그 취미를 가장 좋아하세요?")
				.cardEng("eng")
				.build();

			Card ch2 = Card.builder()
				.cardCode(CardCode.HOBBY)
				.cardKor("최근에 관심을 갖고 있는 새로운 취미가 있으신가요?")
				.cardEng("eng2")
				.build();



			em.persist(cf1);
			em.persist(cf2);
			em.persist(cw1);
			em.persist(cw2);
			em.persist(ch1);
			em.persist(ch2);
			em.persist(ct1);
			em.persist(ct2);

		}

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