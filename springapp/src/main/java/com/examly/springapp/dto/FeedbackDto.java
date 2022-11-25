package com.examly.springapp.dto;

public class FeedbackDto {
	private String comments;
	
	private UserDto user;

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public UserDto getUser() {
		return user;
	}

	public void setUserDto(UserDto user) {
		this.user = user;
	}

}
