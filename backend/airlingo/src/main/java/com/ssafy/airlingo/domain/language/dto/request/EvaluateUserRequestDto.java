package com.ssafy.airlingo.domain.language.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "유저의 실력/별점(매너) 평가 DTO")
public class EvaluateUserRequestDto {

    @Schema(description = "실력 평가 당하는 유저 ID", example = "1")
    private Long userId;

    @Schema(description = "언어 등급 평가 결과 ID", example = "2")
    private Integer gradeId;

    @Schema(description = "사용자가 사용한 언어 ID", example = "1")
    private Integer languageId;

   @Schema(description = "스터디 ID", example = "1")
   private Long studyId;

    @Schema(description = "언어 등급 평가 결과 ID", example = "4.37")
    private float rating;
}
