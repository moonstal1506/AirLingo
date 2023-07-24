package com.ssafy.airlingo.global.rabbitmq;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class Producer {

	private final RabbitTemplate rabbitTemplate;

	public void producer(String exchange, String routeKey, Object object){
		rabbitTemplate.convertAndSend(exchange, routeKey, object);
	}
}
