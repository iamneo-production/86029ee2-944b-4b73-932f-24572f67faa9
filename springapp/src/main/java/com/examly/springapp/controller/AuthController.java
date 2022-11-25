package com.examly.springapp.controller;




import javax.validation.Valid;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.dto.RegisterDto;
import com.examly.springapp.dto.UserDto;
import com.examly.springapp.security.CustomUserDetailsService;
import com.examly.springapp.security.JWTAuthRequest;
import com.examly.springapp.security.JWTResponse;
import com.examly.springapp.security.JWTTokenHelper;
import com.examly.springapp.services.UserService;
import com.examly.springapp.utility.api.responses.ApiResponse;



@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired
	private JWTTokenHelper tokenHelper;
	
	@Autowired
	private CustomUserDetailsService userDetailsService;
	
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private UserService userService;
	
	@PostMapping(path = "/login",
			consumes= MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<JWTResponse> createToken(@RequestBody JWTAuthRequest request) throws Exception{
		
		this.authenticate(request.getUsername(), request.getPassword());
		
		final UserDetails userDetails = this.userDetailsService.loadUserByUsername(request.getUsername());
		
		final String jwtToken = this.tokenHelper.generateJwtToken(userDetails);
		
		UserDto userDto = this.userService.getUserByEmail(request.getUsername());
		
		return new ResponseEntity<JWTResponse>(new JWTResponse(jwtToken, userDto), HttpStatus.OK);
	}

	private void authenticate(String username, String password) throws Exception{
		
		UsernamePasswordAuthenticationToken authenticationToken= new UsernamePasswordAuthenticationToken(username, password);
		try {
			this.authenticationManager.authenticate(authenticationToken);
		}
		catch(DisabledException e) {
			throw  new Exception ("User_DISABLED", e);
		}
		catch(BadCredentialsException e) {
			throw new Exception("BAD_CREDENTIALS", e);
		}
		
	}	
	
	@PostMapping(path="/signup",
			consumes=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ApiResponse> signUp(@Valid @RequestBody RegisterDto user){
		return this.userService.registerNewUser(user);
	}
	
}
