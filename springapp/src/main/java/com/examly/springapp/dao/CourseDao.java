package com.examly.springapp.dao;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.models.Course;

@Repository
public interface CourseDao extends JpaRepository<Course, Integer> {
	
	Course findByName(String name);
	List<Course> findByNameContainingIgnoreCase(String keyword);
	Set<Course> findByInstituteId(int instituteId);
//	Set<Course>findAllByStudentId(int studentId);

}
