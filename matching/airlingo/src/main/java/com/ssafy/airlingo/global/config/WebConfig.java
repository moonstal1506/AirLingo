package com.ssafy.airlingo.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 요청 경로에 대해
                .allowedOriginPatterns("*")
                .allowedMethods("*") // 모든 HTTP 메소드 허용
                .allowCredentials(true)
                .exposedHeaders("access-token", "refresh-token"); // "access-token" 응답 헤더를 노출합니다.
    }
}
