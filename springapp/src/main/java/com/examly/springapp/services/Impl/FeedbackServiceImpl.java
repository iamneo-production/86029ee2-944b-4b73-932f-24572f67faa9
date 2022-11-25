package com.examly.springapp.services.Impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.dao.FeedbackDao;
import com.examly.springapp.dto.FeedbackDto;
import com.examly.springapp.models.Feedbacks;
import com.examly.springapp.services.FeedbackService;
import com.examly.springapp.utility.api.responses.ApiResponse;

@Service
public class FeedbackServiceImpl implements FeedbackService{

	@Autowired
	FeedbackDao feedbackDao;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public ApiResponse postFeedback(FeedbackDto feedbackDto) {
		Feedbacks feedback = this.modelMapper.map(feedbackDto, Feedbacks.class);
		this.feedbackDao.save(feedback);
		return new ApiResponse("Feedback posted", true);
	}

	
	

}
