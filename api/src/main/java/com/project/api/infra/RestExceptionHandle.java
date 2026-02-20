package com.project.api.infra;

import com.project.api.dto.errors.ArgumentErrorResponseDTO;
import com.project.api.dto.errors.FieldErrorResponseDTO;
import com.project.api.dto.errors.RestErrorResponseDTO;
import com.project.api.exceptions.RestException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.List;

@ControllerAdvice
public class RestExceptionHandle {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ArgumentErrorResponseDTO> handleValidationErrors(MethodArgumentNotValidException ex) {
        List<FieldErrorResponseDTO> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> new FieldErrorResponseDTO(error.getField(), error.getDefaultMessage()))
                .toList();

        ArgumentErrorResponseDTO response = new ArgumentErrorResponseDTO(
                LocalDateTime.now(),
                "Validation failed",
                errors
        );

        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(RestException.class)
    public ResponseEntity<RestErrorResponseDTO> handleRestExceptions(RestException ex) {
        RestErrorResponseDTO response = new RestErrorResponseDTO(
                LocalDateTime.now(),
                ex.getMessage()
        );

        return ResponseEntity.status(ex.getStatus()).body(response);
    }
}
