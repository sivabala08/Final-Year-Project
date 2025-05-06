<?php
$Name = $_POST['Name'];
$Age = $_POST['Age'];
$BloodGroup = $_POST['BloodGroup'];
$Location = $_POST['Location'];
$Phone_no = $_POST['Phone_no'];
$Email = $_POST['Email'];
$password = $_POST['password'];
$confirmpassword = $_POST['confirmpassword'];

// Check if fields are empty
if (!empty($Name) && !empty($Age) && !empty($BloodGroup) && !empty($Location) && !empty($Phone_no) && !empty($Email) && !empty($password) && !empty($confirmpassword)) {
    // Database connection
    $host = "localhost";
    $dbusername = "root";     
    $dbpassword = "";
    $dbname = "lifeconnect";
    
    $conn = new mysqli($host, $dbusername, $dbpassword, $dbname);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } else {
        $SELECT = "SELECT * FROM loginpage WHERE Email = ? LIMIT 1";
        $INSERT = "INSERT INTO loginpage (Name, Age, BloodGroup, Location, Phone_no, Email, password, confirmpassword) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        
        // Prepare statement to check email
        $stmt = $conn->prepare($SELECT);
        $stmt->bind_param("s", $Email);
        $stmt->execute();
        $stmt->store_result();
        $rnum = $stmt->num_rows;
        
        // Check if email already exists
        if ($rnum == 0) {
            $stmt->close();
            $stmt = $conn->prepare($INSERT);
            $stmt->bind_param("ssssisss", $Name, $Age, $BloodGroup, $Location, $Phone_no, $Email, $password, $confirmpassword);
            if ($stmt->execute()) {
                echo "New record inserted successfully";
                // Optional: Redirect to login page after successful registration
                // header("Location: login.html");
                // exit();
            } else {
                echo "Error: " . $stmt->error;
            }
        } else {
            echo "Someone already registered using this email";
        }
        $stmt->close();
        $conn->close();
    }
} else {
    echo "All fields are required!";
    die();      
}
?>