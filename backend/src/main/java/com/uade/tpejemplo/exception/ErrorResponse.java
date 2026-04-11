package com.uade.tpejemplo.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
public class ErrorResponse {

    private int status;
    private String error;
    private List<String> mensajes;
    private LocalDateTime timestamp;

    public ErrorResponse(int status, String error, List<String> mensajes, LocalDateTime timestamp) {
        this.status = status;
        this.error = error;
        this.mensajes = mensajes;
        this.timestamp = timestamp;
    }
