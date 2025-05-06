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
if (!isset($data['phone']) || !isset($data['email']) || !isset($data['deviceId'])) {
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}

// Sanitize inputs
$phone = sanitize($conn, $data['phone']);
$email = sanitize($conn, $data['email']);
$deviceId = sanitize($conn, $data['deviceId']);

// Validate phone and email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email format']);
    exit;
}

if (!preg_match('/^[0-9]{10,15}$/', $phone)) {
    echo json_encode(['success' => false, 'message' => 'Invalid phone number format']);
    exit;
}

try {
    // Generate a 6-digit OTP
    $otp = sprintf('%06d', mt_rand(0, 999999));
    
    // Generate session ID
    $sessionId = bin2hex(random_bytes(16));
    
    // Set expiration time (5 minutes from now)
    $expiresAt = date('Y-m-d H:i:s', strtotime('+5 minutes'));
    
    // Delete any existing OTP sessions for this user
    $stmt = $conn->prepare("DELETE FROM otp_sessions WHERE phone = ? AND email = ?");
    $stmt->bind_param("ss", $phone, $email);
    $stmt->execute();
    
    // Insert new OTP session
    $stmt = $conn->prepare("INSERT INTO otp_sessions (phone, email, otp, session_id, device_id, expires_at) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $phone, $email, $otp, $sessionId, $deviceId, $expiresAt);
    
    if ($stmt->execute()) {
        // In a real-world application, you would send the OTP via SMS and email here
        // For demonstration purposes, we'll just log it
        error_log("OTP for $phone / $email: $otp");
        
        // For testing, we'll include the OTP in the response
        // In production, REMOVE THIS and only send the OTP via secure channels (SMS/email)
        echo json_encode([
            'success' => true, 
            'message' => 'OTP sent successfully',
            'sessionId' => $sessionId,
            'debugOtp' => $otp // REMOVE IN PRODUCTION!
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to generate OTP']);
    }
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Server error: ' . $e->getMessage()]);
}

$conn->close();