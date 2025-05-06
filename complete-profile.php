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
if (!isset($data['name']) || !isset($data['age']) || !isset($data['location']) || 
    !isset($data['phone']) || !isset($data['email']) || !isset($data['deviceId'])) {
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}

// Sanitize inputs
$name = sanitize($conn, $data['name']);
$age = (int)sanitize($conn, $data['age']);
$location = sanitize($conn, $data['location']);
$phone = sanitize($conn, $data['phone']);
$email = sanitize($conn, $data['email']);
$deviceId = sanitize($conn, $data['deviceId']);

// Validate data
if ($age < 18) {
    echo json_encode(['success' => false, 'message' => 'You must be at least 18 years old']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email format']);
    exit;
}

try {
    // Check if user exists
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ? OR phone = ?");
    $stmt->bind_param("ss", $email, $phone);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        // Update existing user
        $updateStmt = $conn->prepare("UPDATE users SET 
                                    name = ?, 
                                    age = ?, 
                                    location = ?,
                                    device_id = ?
                                    WHERE email = ? OR phone = ?");
                                    
        $updateStmt->bind_param("sissss", $name, $age, $location, $deviceId, $email, $phone);
        
        if ($updateStmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Profile updated successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to update profile']);
        }
    } else {
        // Insert new user
        $insertStmt = $conn->prepare("INSERT INTO users (name, age, location, phone, email, device_id) 
                                     VALUES (?, ?, ?, ?, ?, ?)");
                                     
        $insertStmt->bind_param("sissss", $name, $age, $location, $phone, $email, $deviceId);
        
        if ($insertStmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Profile created successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to create profile']);
        }
    }
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Server error: ' . $e->getMessage()]);
}

$conn->close();