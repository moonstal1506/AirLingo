package com.ssafy.airlingo.global.response;

import lombok.Getter;

@Getter
public class SingleResponseResult<T> extends ResponseResult{

    private T data;

    public SingleResponseResult( T data) {
        super(successResponse.statusCode, successResponse.messages, successResponse.developerMessage, successResponse.timestamp);
        this.data = data;
    }
}

