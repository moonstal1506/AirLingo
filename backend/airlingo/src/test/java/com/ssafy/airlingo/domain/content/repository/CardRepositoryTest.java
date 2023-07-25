package com.ssafy.airlingo.domain.content.repository;

import static org.assertj.core.api.Assertions.*;

import java.util.List;

import org.assertj.core.groups.Tuple;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.ssafy.airlingo.domain.content.entity.Card;
import com.ssafy.airlingo.domain.content.entity.CardCode;

@SpringBootTest
class CardRepositoryTest {

	@Autowired
	private CardRepository cardRepository;

	@BeforeEach
	void deleteAll() {
		cardRepository.deleteAll();
	}

	@DisplayName("카드 대주제에 알맞은 카드 소주제들이 나와야 한다.")
	@Test
	void findAllByCardCode() {
		// given
		Card card1 = Card.builder().cardCode(CardCode.FOOD).cardKor("음식음식음식").cardEng("foodfoodfood").build();
		Card card2 = Card.builder().cardCode(CardCode.FOOD).cardKor("음식2음식2음식2").cardEng("food2food2food2").build();
		Card card3 = Card.builder().cardCode(CardCode.TRAVEL).cardKor("여행여행").cardEng("traveltravel").build();

		cardRepository.saveAll(List.of(card1, card2, card3));

		// when
		List<Card> cardList = cardRepository.findAllByCardCode(CardCode.FOOD);

		// then
		assertThat(cardList).hasSize(2)
			.extracting("cardCode", "cardKor", "cardEng")
			.containsExactlyInAnyOrder(
				Tuple.tuple(CardCode.FOOD, "음식음식음식", "foodfoodfood"),
				Tuple.tuple(CardCode.FOOD, "음식2음식2음식2", "food2food2food2")
			);
	}
}