package com.ssafy.airlingo.domain.chat.service;

import com.ssafy.airlingo.domain.chat.repository.ChatRoomRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class LettuceLockChatServiceTest {
    @Autowired
    private LettuceLockChatService lettuceLockChatService ;

    @Autowired
    private ChatRoomRepository chatRoomRepository;

    @Test
    public void 동시에_2명이_요청() throws InterruptedException {
        int threadCount = 2;
        ExecutorService executorService = Executors.newFixedThreadPool(32);
        CountDownLatch latch = new CountDownLatch(threadCount);

        for (int i = 0; i < threadCount; i++) {
            executorService.submit(() -> {
                try {
                    lettuceLockChatService.createRoomAndEnterRoom("airlingo");
                } catch (InterruptedException e) {
                    e.printStackTrace();
                } finally {
                    latch.countDown();
                }
            });
        }

        latch.await();
        assertEquals(1, chatRoomRepository.findAllRoom().size());
    }
}