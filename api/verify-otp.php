<?php
// Set headers for JSON response
header('Content-Type: application/json');

// Include database connection
require_once '../config.php';

// Check if it's a POST request
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

// Get JSON data from the request
$data = json_decode(file_get_contents('php://input'), true);

// Validate input data
if (!isset($data['phone']) || !isset($data['email']) || !isset($data['otp']) || 
    !isset($data['sessionId']) || !isset($data['deviceId'])) {
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}

// Sanitize inputs
$phone = sanitize($conn, $data['phone']);
$email = sanitize($conn, $data['email']);
$otp = sanitize($conn, $data['otp']);
$sessionId = sanitize($conn, $data['sessionId']);
$deviceId = sanitize($conn, $data['deviceId']);

try {
    // Check if OTP session exists and is valid
    $stmt = $conn->prepare("SELECT * FROM otp_sessions WHERE 
                           phone = ? AND 
                           email = ? AND 
                           session_id = ? AND 
                           device_id = ? AND 
                           otp = ? AND 
                           expires_at > NOW() AND 
                           is_verified = 0");
    
    $stmt->bind_param("sssss", $phone, $email, $sessionId, $deviceId, $otp);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        // Mark OTP as verified
        $updateStmt = $conn->prepare("UPDATE otp_sessions SET is_verified = 1 WHERE session_id = ?");
        $updateStmt->bind_param("s", $sessionId);
        $updateStmt->execute();
        
        echo json_encode(['success' => true, 'message' => 'OTP verified successfully']);
    } else {
        // Check if OTP is expired
        $checkExpired = $conn->prepare("SELECT * FROM otp_sessions WHERE 
                                       phone = ? AND 
                                       email = ? AND 
                                       session_id = ? AND 
                                       expires_at <= NOW()");
        
        $checkExpired->bind_param("sss", $phone, $email, $sessionId);
        $checkExpired->execute();
        $expiredResult = $checkExpired->get_result();
        
        if ($expiredResult->num_rows > 0) {
            echo json_encode(['success' => false, 'message' => 'OTP has expired. Please request a new one.']);
        } else {
            // Check if OTP is already verified
            $checkVerified = $conn->prepare("SELECT * FROM otp_sessions WHERE 
                                           phone = ? AND 
                                           email = ? AND 
                                           session_id = ? AND 
                                           is_verified = 1");
            
            $checkVerified->bind_param("sss", $phone, $email, $sessionId);
            $checkVerified->execute();
            $verifiedResult = $checkVerified->get_result();
            
            if ($verifiedResult->num_rows > 0) {
                echo json_encode(['success' => false, 'message' => 'This OTP has already been used.']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Invalid OTP. Please try again.']);
            }
        }
    }
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Server error: ' . $e->getMessage()]);
}

$conn->close();