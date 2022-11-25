package com.examly.springapp.services;

import org.springframework.http.ResponseEntity;

import com.examly.springapp.dto.RegisterDto;
import com.examly.springapp.dto.UserDto;
import com.examly.springapp.utility.api.responses.ApiResponse;

public interface UserService {
	
	public ResponseEntity<ApiResponse> registerNewUser(RegisterDto newUser);
	
	public UserDto getUserById(int id);

	public UserDto getUserByEmail(String email);
	

}
