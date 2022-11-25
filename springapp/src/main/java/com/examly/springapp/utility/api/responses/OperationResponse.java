package com.examly.springapp.utility.api.responses;

public class OperationResponse {
	
	private String entity;

	private String operation;
	
	private boolean status;
	
	private String message;
	public OperationResponse(String entity, String operation, boolean status) {
		super();
		this.entity=entity;
		this.operation = operation;
		this.status = status;
	}
	public String getEntity() {
		return entity;
	}
	public void setEntity(String entity) {
		this.entity = entity;
	}
	public String getOperation() {
		return operation;
	}
	public void setOperation(String operation) {
		this.operation = operation;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
}
