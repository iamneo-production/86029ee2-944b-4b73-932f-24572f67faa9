package com.examly.springapp.utility.api.responses;

public class ApiErrorResponse {
	
	String errorMessage;
	boolean status;
	
	public ApiErrorResponse(String message, boolean status ) {
		super();
		this.errorMessage = message;
		this.status = status;
	}


	public String getErrorMessage() {
		return errorMessage;
	}


	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}


	public boolean isStatus() {
		return status;
	}


	public void setStatus(boolean status) {
		this.status = status;
	}
	
	
	
	
}

