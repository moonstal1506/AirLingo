package com.ssafy.airlingo.domain.S3.service;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.transcribe.model.Media;
import com.amazonaws.services.transcribe.model.LanguageCode;
import com.amazonaws.services.transcribe.model.StartTranscriptionJobRequest;
import com.amazonaws.services.transcribe.model.StartTranscriptionJobResult;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class AwsTranscribeService {

	@Value("${cloud.aws.s3.bucket}")
	private String bucketName;

	@Value("${access-key}")
	private String awsAccessKey;
	@Value("${secret-key}")
	private String awsSecretKey;

	private final AmazonS3Client amazonS3Client;

	AmazonS3 s3Client() {
		log.info("Intialize AWS S3 Client");
		BasicAWSCredentials awsCreds = new BasicAWSCredentials(awsAccessKey, awsSecretKey);
		AWSStaticCredentialsProvider awsStaticCredentialsProvider = new AWSStaticCredentialsProvider(awsCreds);
		return AmazonS3ClientBuilder.standard().withCredentials(awsStaticCredentialsProvider).withRegion(Regions.AP_NORTHEAST_2)
			.build();
	}

	// StartTranscriptionJobResult startTranscriptionJob(String key) {
	// 	log.debug("Start Transcription Job By Key {}",key);
	// 	Media media = new Media().withMediaFileUri(s3Client().getUrl(bucketName, key).toExternalForm());
	//
	// 	String jobName = key.concat(RandomString.make());
	// 	StartTranscriptionJobRequest startTranscriptionJobRequest = new StartTranscriptionJobRequest()
	// 		.withLanguageCode(LanguageCode.EnUS).withTranscriptionJobName(jobName).withMedia(media);
	// 	StartTranscriptionJobResult startTranscriptionJobResult = transcribeClient()
	// 		.startTranscriptionJob(startTranscriptionJobRequest);
	// 	return startTranscriptionJobResult;
	// }

}
