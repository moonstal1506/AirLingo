package com.ssafy.airlingo.domain.user.service;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.airlingo.domain.S3.dto.S3FileDto;
import com.ssafy.airlingo.domain.language.entity.Grade;
import com.ssafy.airlingo.domain.language.entity.Language;
import com.ssafy.airlingo.domain.language.entity.UserLanguage;
import com.ssafy.airlingo.domain.language.repository.GradeRepository;
import com.ssafy.airlingo.domain.language.repository.LanguageRepository;
import com.ssafy.airlingo.domain.language.repository.UserLanguageRepository;
import com.ssafy.airlingo.domain.user.dto.request.AddInterestLanguageRequestDto;
import com.ssafy.airlingo.domain.user.dto.request.CreateUserAccountRequestDto;
import com.ssafy.airlingo.domain.user.dto.request.DeleteInterestLanguageRequestDto;
import com.ssafy.airlingo.domain.user.dto.request.LanguageWithGradeDto;
import com.ssafy.airlingo.domain.user.dto.request.LoginRequestDto;
import com.ssafy.airlingo.domain.user.dto.request.UpdateBioRequestDto;
import com.ssafy.airlingo.domain.user.dto.request.UpdateNicknameRequestDto;
import com.ssafy.airlingo.domain.user.dto.request.UpdatePasswordRequestDto;
import com.ssafy.airlingo.domain.user.dto.response.DailyGridResponseDto;
import com.ssafy.airlingo.domain.user.dto.response.LoginResponseDto;
import com.ssafy.airlingo.domain.user.dto.response.UserResponseDto;
import com.ssafy.airlingo.domain.user.entity.DailyGrid;
import com.ssafy.airlingo.domain.user.entity.User;
import com.ssafy.airlingo.domain.user.repository.DailyGridRepository;
import com.ssafy.airlingo.domain.user.repository.RefreshTokenRepository;
import com.ssafy.airlingo.domain.user.repository.UserRepository;
import com.ssafy.airlingo.global.exception.NotExistAccountException;
import com.ssafy.airlingo.global.util.JwtService;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

	private static final String DEFAULT_IMAGE = "https://airlingobucket.s3.ap-northeast-2.amazonaws.com/322cbe51-5407-44f4-aa9d-08676f3a4e5d.png";
	@Value("${cloud.aws.s3.bucket}")
	private String bucketName;

	private final AmazonS3Client amazonS3Client;
	private final UserRepository userRepository;
	private final JwtService jwtService;
	private final RefreshTokenRepository refreshTokenRepository;
	private final LanguageRepository languageRepository;
	private final GradeRepository gradeRepository;
	private final DailyGridRepository dailyGridRepository;
	private final UserLanguageRepository userLanguageRepository;

	@Override
	@Transactional
	public Long createUserAccount(CreateUserAccountRequestDto createUserAccountRequestDto) {
		log.info("UserServiceImpl_createUserAccount -> 새로운 사용자 회원가입");
		User newUserAccount = createUserAccountRequestDto.toUserEntity(languageRepository, gradeRepository);
		return userRepository.save(newUserAccount).getUserId();
	}

	@Override
	public LoginResponseDto login(LoginRequestDto loginRequestDto, HttpServletResponse response) {
		log.info("UserServiceImpl_login -> 사용자 로그인 시도");

		User loginUser = userRepository.findUserByUserLoginIdAndUserPassword(loginRequestDto.getUserLoginId(),
			loginRequestDto.getUserPassword()).orElseThrow(NotExistAccountException::new);

		LoginResponseDto loginResponseDto = loginUser.toLoginResponseDto();

		setToken(loginUser, response);
		return loginResponseDto;
	}

	@Override
	public void setToken(User loginUser, HttpServletResponse response) {
		log.info("UserServiceImpl_setToken -> 로그인 성공, 토큰 생성");
		String accessToken = jwtService.createAccessToken("userLoginId", loginUser.getUserLoginId()); // key, value
		String refreshToken = jwtService.createRefreshToken("userLoginId", loginUser.getUserLoginId()); // key, value

		response.setHeader("access-token", accessToken);
		response.setHeader("refresh-token", refreshToken);

		refreshTokenRepository.saveRefreshToken(loginUser.getUserLoginId(), refreshToken);
	}

	@Override
	public void logout(String userLoginId) {
		log.info("UserServiceImpl_logout -> 로그아웃 중");
		refreshTokenRepository.deleteRefreshToken(userLoginId);
	}

	@Override
	public void deleteUserAccount(Long userId) {
		log.info("UserServiceImpl_deleteUserAccount -> 회원탈퇴 중");
		User user = userRepository.findById(userId).orElseThrow(NotExistAccountException::new);
		refreshTokenRepository.deleteRefreshToken(user.getUserLoginId());
		userRepository.delete(user);
	}

	@Override
	@Transactional
	public void updatePassword(UpdatePasswordRequestDto updatePasswordRequestDto) {
		log.info("UserServiceImpl_updatePassword");
		User user = userRepository.findById(updatePasswordRequestDto.getUserId())
			.orElseThrow(NotExistAccountException::new);
		user.updatePassword(updatePasswordRequestDto.getUserPassword());
	}

	@Override
	@Transactional
	public void updateNickname(UpdateNicknameRequestDto updateNicknameRequestDto) {
		log.info("UserServiceImpl_updateNickname");
		User user = userRepository.findById(updateNicknameRequestDto.getUserId())
			.orElseThrow(NotExistAccountException::new);
		user.updateNickname(updateNicknameRequestDto.getUserNickname());
	}

	@Override
	@Transactional
	public void updateBio(UpdateBioRequestDto updateBioRequestDto) {
		log.info("UserServiceImpl_updateBio");
		User user = userRepository.findById(updateBioRequestDto.getUserId()).orElseThrow(NotExistAccountException::new);
		user.updateBio(updateBioRequestDto.getUserBio());
	}

	@Override
	@Transactional
	public List<S3FileDto> uploadFiles(List<MultipartFile> multipartFiles, Long userId) {
		List<S3FileDto> s3files = new ArrayList<>();
		String originalFileName = multipartFiles.get(0).getOriginalFilename();
		String uploadFileName = getUuidFileName(originalFileName);
		String uploadFileUrl = "";

		ObjectMetadata objectMetadata = new ObjectMetadata();
		objectMetadata.setContentLength(multipartFiles.get(0).getSize());
		objectMetadata.setContentType(multipartFiles.get(0).getContentType());

		try (InputStream inputStream = multipartFiles.get(0).getInputStream()) {

			String keyName = uploadFileName; // ex) 구분/년/월/일/파일.확장자

			// S3에 폴더 및 파일 업로드
			amazonS3Client.putObject(
				new PutObjectRequest(bucketName, keyName, inputStream, objectMetadata));

			// S3에 업로드한 폴더 및 파일 URL
			uploadFileUrl = amazonS3Client.getUrl(bucketName, keyName).toString();
			User user = userRepository.findById(userId).orElseThrow(NotExistAccountException::new);
			user.updateImage(uploadFileUrl);
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

		return s3files;
	}

	public String getUuidFileName(String fileName) {
		String ext = fileName.substring(fileName.indexOf(".") + 1);
		return UUID.randomUUID().toString() + "." + ext;
	}

	@Override
	@Transactional
	public String deleteImage(Long userId) {
		log.info("UserServiceImpl_deleteImage");
		User user = userRepository.findById(userId).orElseThrow(NotExistAccountException::new);
		user.updateImage(DEFAULT_IMAGE);
		return user.getUserImgUrl();
	}

	@Override
	@Transactional
	public void addInterestLanguage(AddInterestLanguageRequestDto addInterestLanguageRequestDto) {
		log.info("UserServiceImpl_addInterestLanguage");
		User user = userRepository.findById(addInterestLanguageRequestDto.getUserId())
			.orElseThrow(NotExistAccountException::new);
		List<LanguageWithGradeDto> userInterestLanguageList = addInterestLanguageRequestDto.getUserInterestLanguageList();
		for (LanguageWithGradeDto languageWithGrade : userInterestLanguageList) {
			Language language = languageRepository.findByLanguageId(languageWithGrade.getLanguageId());
			Grade grade = gradeRepository.findByGradeId(languageWithGrade.getGradeId());
			UserLanguage userLanguage = UserLanguage.builder()
				.user(user)
				.language(language)
				.grade(grade)
				.build();
			userLanguageRepository.save(userLanguage);
		}
	}

	@Override
	@Transactional
	public void deleteInterestLanguage(DeleteInterestLanguageRequestDto deleteInterestLanguageRequestDto) {
		log.info("UserServiceImpl_deleteInterestLanguage");
		User user = userRepository.findById(deleteInterestLanguageRequestDto.getUserId())
			.orElseThrow(NotExistAccountException::new);
		Language language = languageRepository.findByLanguageId(deleteInterestLanguageRequestDto.getLanguageId());

		userLanguageRepository.deleteByUserAndLanguage(user, language);
	}

	@Override
	public UserResponseDto findUserByUserId(Long userId) {
		User user = userRepository.findById(userId).orElseThrow(NotExistAccountException::new);
		// User(Entity)를 UserResponseDto로 변환
		return user.toDto();
	}

	public List<DailyGridResponseDto> findDailyGridByUserId(Long userId) {
		User user = userRepository.findById(userId).orElseThrow(NotExistAccountException::new);
		List<DailyGridResponseDto> dailyGridList = dailyGridRepository.findDailyGridByUser(user)
			.stream()
			.map(DailyGrid::toDto)
			.collect(Collectors.toList());
		return dailyGridList;
	}
}
