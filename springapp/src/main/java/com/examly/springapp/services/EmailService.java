package com.examly.springapp.services;

import com.examly.springapp.models.Email;

public interface EmailService {
	
	String sendSimpleEmail(Email email);

}
