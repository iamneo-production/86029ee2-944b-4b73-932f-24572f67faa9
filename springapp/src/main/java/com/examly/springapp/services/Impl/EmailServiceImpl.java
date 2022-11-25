package com.examly.springapp.services.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.examly.springapp.models.Email;
import com.examly.springapp.services.EmailService;


@Service
public class EmailServiceImpl implements EmailService {
	
	@Autowired
	private JavaMailSender javaMailSender;
	
	@Value("${spring.mail.username")
	private String sender;
	
	@Override
	public String sendSimpleEmail(Email email) {
		
		try {
			SimpleMailMessage mail = new SimpleMailMessage();
			
			mail.setFrom(sender);
			mail.setTo(email.getTo());
			mail.setText(email.getMessage());
			mail.setSubject(email.getSubject());
			
			javaMailSender.send(mail);
			
			return("Mail Sent Successufully to " + email.getTo());
			
		}
		catch(Exception e) {
			return "Error while sending email";
		}
	}
	
	

}
