package com.lifelink.bloodbank_backend.controller;

import com.lifelink.bloodbank_backend.dto.LoginRequest;
import com.lifelink.bloodbank_backend.dto.LoginResponse;
import com.lifelink.bloodbank_backend.dto.RegisterRequest;
import com.lifelink.bloodbank_backend.service.AuthService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // =========================
    // REGISTER
    // =========================

    @PostMapping("/register")
    public String register(
            @Valid @RequestBody RegisterRequest request) {

        return authService.register(request);
    }

    // =========================
    // LOGIN
    // =========================

    @PostMapping("/login")
    public LoginResponse login(
            @Valid @RequestBody LoginRequest request) {

        return authService.login(request);
    }

    // =========================
    // TEMPORARY PASSWORD RESET
    // =========================

    @GetMapping("/reset-krishnam")
    public String resetKrishnamPassword() {

        return authService.resetKrishnamPassword();
    }
}