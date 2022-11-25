package com.examly.springapp.exceptions;

public class DuplicateResourceFoundException  extends RuntimeException{
	
	private String entity;
	private String field;
	private int fieldId;
	private String fieldValue;
	
	
	public DuplicateResourceFoundException(String entity, String field, int fieldId) {
		super(String.format("%s with %s:%s already exists!", entity, field, fieldId));
		this.entity = entity;
		this.field = field;
		this.fieldId = fieldId;
	}
	
	
	public DuplicateResourceFoundException(String entity, String field, String fieldValue) {
		super(String.format("%s with %s:%s already exists!", entity, field, fieldValue));
		this.entity = entity;
		this.field = field;
		this.fieldValue = fieldValue;
	}


	public String getEntity() {
		return entity;
	}
	public void setEntity(String entity) {
		this.entity = entity;
	}
	public String getField() {
		return field;
	}
	public void setField(String field) {
		this.field = field;
	}
	public int getFieldId() {
		return fieldId;
	}
	public void setFieldId(int fieldId) {
		this.fieldId = fieldId;
	}
	public String getFieldValue() {
		return fieldValue;
	}
	public void setFieldValue(String fieldValue) {
		this.fieldValue = fieldValue;
	}
	
	

}
