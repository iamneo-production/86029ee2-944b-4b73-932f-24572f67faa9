package com.examly.springapp.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.models.Institute;

@Repository
public interface InstituteDao extends JpaRepository<Institute, Integer>{
	
	Institute findByName(String name);
	
	List<Institute> findByNameContainingIgnoreCase(String keyword);

}
