-- Run this script in phpMyAdmin to set up your database
-- You can import this file directly through the phpMyAdmin interface

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS life_connect;

-- Use the database
USE life_connect;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT(3) NOT NULL,
    location VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    device_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create OTP sessions table
CREATE TABLE IF NOT EXISTS otp_sessions (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    otp VARCHAR(6) NOT NULL,
    session_id VARCHAR(255) NOT NULL,
    device_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE
);

-- Add indexes for faster queries
ALTER TABLE users ADD INDEX idx_email (email);
ALTER TABLE users ADD INDEX idx_phone (phone);
ALTER TABLE otp_sessions ADD INDEX idx_session (session_id);
ALTER TABLE otp_sessions ADD INDEX idx_phone_email (phone, email);

-- Add sample user for testing (optional)
-- INSERT INTO users (name, age, location, phone, email, device_id) 
-- VALUES ('Test User', 30, 'New York, NY', '1234567890', 'test@example.com', 'test-device-id-12345');