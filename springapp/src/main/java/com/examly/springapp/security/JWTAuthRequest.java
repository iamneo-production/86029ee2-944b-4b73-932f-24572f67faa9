package com.examly.springapp.security;

import java.io.Serializable;

public class JWTAuthRequest implements Serializable{
	
		/**
	 * 
	 */
	private static final long serialVersionUID = -3392738016546223248L;
	
		private String username;
		private String password;
		
		public String getUsername() {
			return username;
		}
		public void setUsername(String username) {
			this.username = username;
		}
		public String getPassword() {
			return password;
		}
		public void setPassword(String password) {
			this.password = password;
		}
		
		
}
