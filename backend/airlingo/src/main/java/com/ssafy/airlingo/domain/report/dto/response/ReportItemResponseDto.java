package com.ssafy.airlingo.domain.report.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "신고 항목 정보")
public class ReportItemResponseDto {

	@Schema(description = "신고항목Id", example = "1", required = true)
	private Long reportItemId;

	@Schema(description = "신고 항목", example = "욕설", required = true)
	private String reportItem;

}
