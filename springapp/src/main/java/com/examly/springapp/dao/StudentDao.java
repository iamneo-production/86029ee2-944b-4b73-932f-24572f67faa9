package com.examly.springapp.dao;


import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.examly.springapp.models.Student;

public interface StudentDao extends JpaRepository<Student, Integer>{
	
	Student findFirstByEmail(String email);
	
	List<Student> findAllByEmail(String email);
	
	List<Student> findAllByCourseId(int courseId);
	
	@Query("SELECT a FROM Student a WHERE lower(a.eligibility) = 'Pending'")
	List<Student> getAllApplicants();
	
	@Query("SELECT s FROM Student s WHERE s.eligibility = 'Accepted' ")
	List<Student> getAllStudents();
 

}