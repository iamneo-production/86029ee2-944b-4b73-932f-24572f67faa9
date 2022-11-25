package com.examly.springapp.dao;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.models.Login;

@Repository
public interface LoginDao  extends JpaRepository<Login, String> {

}
