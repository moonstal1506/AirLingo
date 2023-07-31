package com.ssafy.airlingo.domain.user.dto.request;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "(UpdateImageRequestDto) 사진 변경 요청 DTO")
public class UpdateImageRequestDto {

	@NotNull
	@Schema(description = "유저 ID")
	private Long userId;

	@NotBlank
	@Schema(description = "유저 이미지")
	private String userImgUrl;

	private List<MultipartFile> files;
}
