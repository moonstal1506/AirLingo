package com.ssafy.airlingo.domain.report.dto.request;

import com.ssafy.airlingo.domain.report.entity.Report;
import com.ssafy.airlingo.domain.report.entity.ReportItem;
import com.ssafy.airlingo.domain.user.entity.User;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
@Schema(description = "유저 신고 정보")
public class ReportUserRequestDto {

	@NotNull
	@Schema(description = "신고항목 ID", example = "1", required = true)
	private Long reportItemId;

	@NotNull
	@Schema(description = "신고당한 유저 ID", example = "1", required = true)
	private Long userId;

	@NotBlank
	@Schema(description = "신고 내용", example = "심한 욕설을 하였습니다.")
	private String description;

	public Report toReportEntity(User user, ReportItem reportItem){
		return Report.builder()
			.user(user)
			.reportItem(reportItem)
			.reportDescription(description)
			.build();
	}
}
