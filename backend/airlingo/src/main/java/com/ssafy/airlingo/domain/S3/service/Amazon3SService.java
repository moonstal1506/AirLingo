package com.ssafy.airlingo.domain.S3.service;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.airlingo.domain.S3.dto.S3FileDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class Amazon3SService {

	@Value("${cloud.aws.s3.bucket}")
	private String bucketName;

	private final AmazonS3Client amazonS3Client;

	/**
	 * S3로 파일 업로드
	 */
	public List<S3FileDto> uploadFiles(List<MultipartFile> multipartFiles) {

		List<S3FileDto> s3files = new ArrayList<>();

		for (MultipartFile multipartFile : multipartFiles) {

			String originalFileName = multipartFile.getOriginalFilename();
			String uploadFileName = getUuidFileName(originalFileName);
			String uploadFileUrl = "";

			ObjectMetadata objectMetadata = new ObjectMetadata();
			objectMetadata.setContentLength(multipartFile.getSize());
			objectMetadata.setContentType(multipartFile.getContentType());

			try (InputStream inputStream = multipartFile.getInputStream()) {

				String keyName = uploadFileName; // ex) 구분/년/월/일/파일.확장자

				// S3에 폴더 및 파일 업로드
				amazonS3Client.putObject(
					new PutObjectRequest(bucketName, keyName, inputStream, objectMetadata));

				// TODO : 외부에 공개하는 파일인 경우 Public Read 권한을 추가, ACL 확인
      		  /*amazonS3Client.putObject(
                new PutObjectRequest(bucket, s3Key, inputStream, objectMetadata)
                .withCannedAcl(CannedAccessControlList.PublicRead));*/

				// S3에 업로드한 폴더 및 파일 URL
				uploadFileUrl = amazonS3Client.getUrl(bucketName, keyName).toString();

			} catch (IOException e) {
				e.printStackTrace();
				log.error("Filed upload failed", e);
			}

			s3files.add(
				S3FileDto.builder()
					.originalFileName(originalFileName)
					.uploadFileName(uploadFileName)
					.uploadFileUrl(uploadFileUrl)
					.build());
		}

		return s3files;
	}

	/**
	 * S3에 업로드된 파일 삭제
	 */
	public String deleteFile(String uuidFileName) {

		String result = "success";

		try {
			String keyName = uuidFileName;
			boolean isObjectExist = amazonS3Client.doesObjectExist(bucketName, keyName);
			if (isObjectExist) {
				amazonS3Client.deleteObject(bucketName, keyName);
			} else {
				result = "file not found";
			}
		} catch (Exception e) {
			log.debug("Delete File failed", e);
		}

		return result;
	}

	/**
	 * UUID 파일명 반환
	 */
	public String getUuidFileName(String fileName) {
		String ext = fileName.substring(fileName.indexOf(".") + 1);
		return UUID.randomUUID().toString() + "." + ext;
	}

	public String uploadVoiceFileToS3(MultipartFile voiceFile) throws IOException {
		log.info("UploadFileToS3_uploadVoiceFileToS3 || S3로 음성파일 업로드");
		String originalName = voiceFile.getOriginalFilename(); // 파일 이름
		long size = voiceFile.getSize(); // 파일 크기

		ObjectMetadata objectMetaData = new ObjectMetadata();
		objectMetaData.setContentType(voiceFile.getContentType());
		objectMetaData.setContentLength(size);

		// S3에 업로드
		amazonS3Client.putObject(
			new PutObjectRequest(bucketName, originalName, voiceFile.getInputStream(), objectMetaData)
				.withCannedAcl(CannedAccessControlList.PublicRead)
		);

		String audioPath = amazonS3Client.getUrl(bucketName, originalName).toString(); // 접근가능한 URL 가져오기
		return audioPath;
	}

	public String getVoiceFileUrl(String sessionId) {
		log.info("getVoiceFileUrl");
		String key = sessionId + "/" + sessionId + ".mp3";
		String voiceFileUrl = amazonS3Client.getUrl(bucketName, key).toString(); // 접근가능한 URL 가져오기
		log.info(voiceFileUrl);
		return voiceFileUrl;
	}
}