package com.examly.springapp.security;

import java.io.Serializable;

import com.examly.springapp.dto.UserDto;

public class JWTResponse implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 5336418600330622409L;
	private final String token;
	private final UserDto user;
	
	
	public JWTResponse(String token, UserDto user) {
	   this.token = token;
	   this.user = user;
	   
   	}
   	public String getToken() {
   		return token;
   	}
	public UserDto getUser() {
		return user;
	}
   	
}
