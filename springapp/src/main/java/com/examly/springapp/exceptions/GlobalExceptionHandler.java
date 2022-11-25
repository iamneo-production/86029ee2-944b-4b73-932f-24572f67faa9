package com.examly.springapp.exceptions;

import java.sql.SQLIntegrityConstraintViolationException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.examly.springapp.utility.api.responses.ApiResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ApiResponse> resourceNotFoundExceptionHandler(ResourceNotFoundException ex){
		String message = ex.getMessage();
		ApiResponse response = new ApiResponse(message, false);
		
		return new ResponseEntity<ApiResponse>(response, HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(DuplicateResourceFoundException.class)
	public ResponseEntity<ApiResponse> resourceNotFoundExceptionHandler(DuplicateResourceFoundException ex){
		String message = ex.getMessage();
		ApiResponse response = new ApiResponse(message, false);
		
		return new ResponseEntity<ApiResponse>(response, HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(SQLIntegrityConstraintViolationException.class)
	public ResponseEntity<ApiResponse> integrityContraintViolationExceptionHandler(SQLIntegrityConstraintViolationException ex){
		String message = ex.getMessage();
		ApiResponse response = new ApiResponse(message, false);
		
		return new ResponseEntity<ApiResponse>(response, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ApiResponse> methodArgumentNotValidExceptionHandler(MethodArgumentNotValidException ex){
		String message = ex.getMessage();
		ApiResponse response = new ApiResponse(message, false);
		
		return new ResponseEntity<ApiResponse>(response, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(TableEmptyException.class)
	public ResponseEntity<ApiResponse> tableEmptyExceptionHandler(TableEmptyException ex){
		String message = ex.getMessage();
		ApiResponse response = new ApiResponse(message, false);
		
		return new ResponseEntity<ApiResponse>(response, HttpStatus.BAD_REQUEST);
	}
	

}
