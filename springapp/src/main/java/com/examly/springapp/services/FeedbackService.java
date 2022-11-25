package com.examly.springapp.services;

import com.examly.springapp.dto.FeedbackDto;
import com.examly.springapp.models.Feedbacks;
import com.examly.springapp.utility.api.responses.ApiResponse;

public interface FeedbackService {

	ApiResponse postFeedback(FeedbackDto feedbackDto);
}
