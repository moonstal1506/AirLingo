package com.ssafy.airlingo.domain.S3.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.airlingo.domain.S3.service.Amazon3SService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
public class AmazonS3Controller {

	private final Amazon3SService amazon3SService;

	// @PostMapping("/uploads")
	// public ResponseEntity<Object> uploadFiles(
	// 	@RequestPart(value = "files") List<MultipartFile> multipartFiles) {
	// 	return ResponseEntity
	// 		.status(HttpStatus.OK)
	// 		.body(amazon3SService.uploadFiles(multipartFiles));
	// }
	@DeleteMapping("/delete")
	public ResponseEntity<Object> deleteFile(
		@RequestParam(value = "uuidFileName") String uuidFileName) {
		return ResponseEntity
			.status(HttpStatus.OK)
			.body(amazon3SService.deleteFile(uuidFileName));
	}
}