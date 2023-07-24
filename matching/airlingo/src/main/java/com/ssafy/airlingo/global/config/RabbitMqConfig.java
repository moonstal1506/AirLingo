package com.ssafy.airlingo.global.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.databind.ObjectMapper;

@Configuration
public class RabbitMqConfig {

	@Bean
	public DirectExchange directExchange(){
		return new DirectExchange("matching.exchange");
	}

	@Bean
	public Queue queue(){
		return new Queue("matching.queue");
	}

	@Bean
	public Binding binding(DirectExchange directExchange, Queue queue){
		return BindingBuilder.bind(queue).to(directExchange).with("matching.key");
	}

	@Bean
	public RabbitTemplate rabbitTemplate(
		ConnectionFactory connectionFactory,
		MessageConverter messageConverter
	){
		var rabbitTemplate = new RabbitTemplate(connectionFactory);
		rabbitTemplate.setMessageConverter(messageConverter);
		return rabbitTemplate;
	}

	@Bean
	public MessageConverter messageConverter(ObjectMapper objectMapper){
		return new Jackson2JsonMessageConverter(objectMapper);
	}
}
