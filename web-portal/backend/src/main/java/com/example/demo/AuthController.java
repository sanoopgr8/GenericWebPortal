package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    private static final Pattern EMAIL_PATTERN = 
        Pattern.compile("^[A-Za-z0-9+_.-]+@(.+)$");
    
    private static final Pattern PASSWORD_PATTERN = 
        Pattern.compile("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?=\\S+$).{8,}$");

    @PostMapping("/signup")
    @org.springframework.transaction.annotation.Transactional
    public ResponseEntity<Map<String, String>> signup(
            @RequestBody Map<String, String> signupData,
            jakarta.servlet.http.HttpServletRequest request) {
        Map<String, String> response = new HashMap<>();
        
        try {
            // Validate input
            String firstName = signupData.get("firstName");
            String lastName = signupData.get("lastName");
            String email = signupData.get("email");
            String password = signupData.get("password");
            String confirmPassword = signupData.get("confirmPassword");

            // Validation checks
            if (firstName == null || firstName.trim().isEmpty()) {
                response.put("status", "error");
                response.put("message", "First name is required");
                return ResponseEntity.badRequest().body(response);
            }

            if (lastName == null || lastName.trim().isEmpty()) {
                response.put("status", "error");
                response.put("message", "Last name is required");
                return ResponseEntity.badRequest().body(response);
            }

            if (email == null || !EMAIL_PATTERN.matcher(email).matches()) {
                response.put("status", "error");
                response.put("message", "Valid email is required");
                return ResponseEntity.badRequest().body(response);
            }

            if (password == null || !PASSWORD_PATTERN.matcher(password).matches()) {
                response.put("status", "error");
                response.put("message", "Password must be at least 8 characters with uppercase, lowercase, number and special character");
                return ResponseEntity.badRequest().body(response);
            }

            if (!password.equals(confirmPassword)) {
                response.put("status", "error");
                response.put("message", "Passwords do not match");
                return ResponseEntity.badRequest().body(response);
            }

            // Check if email already exists
            User existingUser = userRepository.findByEmail(email);
            User user;
            
            if (existingUser != null) {
                if (existingUser.isVerified()) {
                    response.put("status", "error");
                    response.put("message", "Email already registered");
                    return ResponseEntity.badRequest().body(response);
                }
                // If user exists but not verified, update the existing record
                user = existingUser;
            } else {
                // Create new user
                user = new User();
                user.setEmail(email.toLowerCase().trim());
            }

            // Update/Set user details
            user.setFirstName(firstName.trim());
            user.setLastName(lastName.trim());
            user.setPassword(password); // In production, hash this!
            user.setVerified(false);
            user.setVerificationToken(UUID.randomUUID().toString());
            user.setTokenCreatedAt(LocalDateTime.now());

            userRepository.save(user);

            // Send verification email with request context
            emailService.sendVerificationEmail(user.getEmail(), user.getFirstName(), user.getVerificationToken(), request);

            response.put("status", "success");
            response.put("message", "Registration successful! Please check your email to verify your account.");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Registration failed: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @GetMapping("/verify")
    public ResponseEntity<Map<String, String>> verifyEmail(@RequestParam String token) {
        Map<String, String> response = new HashMap<>();
        
        User user = userRepository.findByVerificationToken(token);
        
        if (user == null) {
            response.put("status", "error");
            response.put("message", "Invalid verification token");
            return ResponseEntity.badRequest().body(response);
        }

        // Check if token is expired (24 hours)
        if (user.getTokenCreatedAt().plusHours(24).isBefore(LocalDateTime.now())) {
            response.put("status", "error");
            response.put("message", "Verification token has expired");
            return ResponseEntity.badRequest().body(response);
        }

        user.setVerified(true);
        user.setVerificationToken(null);
        userRepository.save(user);

        response.put("status", "success");
        response.put("message", "Email verified successfully! You can now log in.");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> loginData) {
        Map<String, String> response = new HashMap<>();
        
        String email = loginData.get("email");
        String password = loginData.get("password");

        User user = userRepository.findByEmail(email);
        
        if (user == null) {
            response.put("status", "error");
            response.put("message", "Invalid credentials");
            return ResponseEntity.badRequest().body(response);
        }

        if (!user.isVerified()) {
            response.put("status", "error");
            response.put("message", "Please verify your email before logging in");
            return ResponseEntity.badRequest().body(response);
        }

        if (!user.getPassword().equals(password)) {
            response.put("status", "error");
            response.put("message", "Invalid credentials");
            return ResponseEntity.badRequest().body(response);
        }

        response.put("status", "success");
        response.put("message", "Login successful");
        response.put("firstName", user.getFirstName());
        response.put("lastName", user.getLastName());
        response.put("email", user.getEmail());
        return ResponseEntity.ok(response);
    }
}
