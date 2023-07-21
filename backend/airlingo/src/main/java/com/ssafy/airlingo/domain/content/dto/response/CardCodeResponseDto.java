package com.ssafy.airlingo.domain.content.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "대화 대주제 카드 정보")
public class CardCodeResponseDto {

    @Schema(description = "카드 코드", example = "FOOD")
    private String code;

    @Schema(description = "카드 한국어 주제", example = "음식")
    private String korSubject;

    @Schema(description = "카드 영어 주제", example = "Food")
    private String engSubject;
}
