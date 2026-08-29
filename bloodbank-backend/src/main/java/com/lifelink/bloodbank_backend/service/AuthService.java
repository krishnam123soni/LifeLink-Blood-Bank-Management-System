package com.lifelink.bloodbank_backend.service;

import com.lifelink.bloodbank_backend.dto.LoginRequest;
import com.lifelink.bloodbank_backend.dto.LoginResponse;
import com.lifelink.bloodbank_backend.dto.RegisterRequest;
import com.lifelink.bloodbank_backend.entity.User;
import com.lifelink.bloodbank_backend.repository.UserRepository;
import com.lifelink.bloodbank_backend.security.JwtService;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            AuthenticationManager authenticationManager) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    // =========================
    // REGISTER
    // =========================

    public String register(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Email already registered.";
        }

        User user = new User();

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());

        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        user.setRole("USER");

        userRepository.save(user);

        return "User registered successfully.";
    }

    // =========================
    // LOGIN
    // =========================

    public LoginResponse login(LoginRequest request) {

    System.out.println("========== LOGIN START ==========");
    System.out.println("LOGIN EMAIL: " + request.getEmail());

    User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() ->
                    new RuntimeException("User not found")
            );

    System.out.println("USER FOUND: " + user.getEmail());
    System.out.println("USER ROLE: " + user.getRole());

    boolean passwordMatch =
            passwordEncoder.matches(
                    request.getPassword(),
                    user.getPassword()
            );

    System.out.println("PASSWORD MATCH: " + passwordMatch);

    if (!passwordMatch) {
        throw new RuntimeException("PASSWORD DOES NOT MATCH");
    }

    System.out.println("PASSWORD MATCHED");

    authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    request.getEmail(),
                    request.getPassword()
            )
    );

    System.out.println("AUTHENTICATION SUCCESS");

    String token = jwtService.generateToken(request.getEmail());

    System.out.println("JWT GENERATED");

    return new LoginResponse(
            token,
            "Login Successful",
            user.getRole()
    );
}

    // =========================
    // TEMPORARY KRISHNAM PASSWORD RESET
    // =========================

    public String resetKrishnamPassword() {

        User user = userRepository
                .findByEmail("krishnam@gmail.com")
                .orElseThrow(() ->
                        new RuntimeException(
                                "Krishnam user not found"
                        )
                );

        // Set new password
        user.setPassword(
                passwordEncoder.encode("123456")
        );

        // Make sure Krishnam remains ADMIN
        user.setRole("ADMIN");

        userRepository.save(user);

        return "Krishnam password reset successfully";
    }
}