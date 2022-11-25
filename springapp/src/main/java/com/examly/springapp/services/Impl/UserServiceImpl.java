package com.examly.springapp.services.Impl;



import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.examly.springapp.dao.UserDao;
import com.examly.springapp.dto.RegisterDto;
import com.examly.springapp.dto.UserDto;
import com.examly.springapp.exceptions.DuplicateResourceFoundException;
import com.examly.springapp.exceptions.ResourceNotFoundException;
import com.examly.springapp.models.Email;
import com.examly.springapp.models.User;
import com.examly.springapp.services.EmailService;
import com.examly.springapp.services.UserService;
import com.examly.springapp.utility.api.responses.ApiResponse;


@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDao userDao;

	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired 
	private PasswordEncoder passwordEncoder;

	@Autowired
	private EmailService emailService;
	

	@Override
	public UserDto getUserById(int id) {
		User user = this.userDao.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

		UserDto userDto = this.modelMapper.map(user, UserDto.class);

		return userDto;
	}



	@Override
	public ResponseEntity<ApiResponse> registerNewUser(RegisterDto newUser) {
		
		Optional<User> existingUser = this.userDao.findByEmail(newUser.getEmail());
		
		if(existingUser.isPresent()) {
			throw new DuplicateResourceFoundException("User", "Email", newUser.getEmail());
		}
		
		User user  = new User(newUser.getEmail(), newUser.getContact(), newUser.getName(), newUser.getPassword());
		//encode the password 
		user.setPassword(this.passwordEncoder.encode(user.getPassword()));
		
		String stringRole = newUser.getRole();
		
		if (stringRole == null) {
		     user.setRole("ROLE_USER");
		} 
		else {
			
	        user.setRole(stringRole);
    	}
		
		this.userDao.save(user);
		
		ApiResponse response = new ApiResponse("User has been registered", true);
		
		String message = String.format("Dear %s,"+"\n"+"Welcome to Diploma Admission. You have successfully registered."+"\n"+"Happy Applying!!", newUser.getName());
		String subject = "Registration to Diploma Admission";
		
		String status = this.emailService.sendSimpleEmail(new Email(newUser.getEmail(), message, subject));
		System.out.println(status);
		
		return new ResponseEntity<ApiResponse>(response, HttpStatus.CREATED);
		
		
	}

	@Override
	public UserDto getUserByEmail(String email) {
		
		User user = this.userDao.findByEmail(email).orElseThrow(()-> new ResourceNotFoundException("User", "Email", email));
		
		UserDto userDto = this.modelMapper.map(user, UserDto.class);
		return userDto;
	}
}
