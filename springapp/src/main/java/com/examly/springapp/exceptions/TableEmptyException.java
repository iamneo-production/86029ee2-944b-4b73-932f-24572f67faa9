package com.examly.springapp.exceptions;

public class TableEmptyException extends RuntimeException{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 5867045645719931713L;
	/**
	 * 
	 */
	
	String tableName;

	public TableEmptyException(String tableName) {
		super(String.format("%s is empty", tableName));
		this.tableName = tableName;
	}

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
	
	
	

}
