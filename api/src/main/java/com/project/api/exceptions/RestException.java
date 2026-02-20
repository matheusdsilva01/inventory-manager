package com.project.api.exceptions;

import lombok.Getter;

@Getter
public abstract class RestException extends RuntimeException {
    private final int status;

    public RestException(String message, int status) {
        super(message);
        this.status = status;
    }
}
