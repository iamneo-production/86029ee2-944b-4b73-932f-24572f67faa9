package com.examly.springapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.models.Feedbacks;

public interface FeedbackDao extends JpaRepository<Feedbacks, Integer>{
	

}
