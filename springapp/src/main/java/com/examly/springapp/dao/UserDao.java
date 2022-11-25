package com.examly.springapp.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.models.User;

@Repository
public interface UserDao extends JpaRepository<User, Integer>{
	
	Optional<User> findByEmail(String userEmail);
	
	
	User findByContact(String userContact);
	
	Optional<User> findByName(String name);
	
	

	
}
