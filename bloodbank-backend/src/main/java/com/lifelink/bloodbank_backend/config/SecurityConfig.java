package com.lifelink.bloodbank_backend.config;

import com.lifelink.bloodbank_backend.security.JwtAuthenticationFilter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    // =========================
    // PASSWORD ENCODER
    // =========================

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // =========================
    // AUTHENTICATION MANAGER
    // =========================

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration) throws Exception {

        return configuration.getAuthenticationManager();
    }

    // =========================
    // CORS CONFIGURATION
    // =========================

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(
                List.of(
                        "http://localhost:5173",
                        "http://localhost:3000",
                        "https://lifelink-backend-qb67.onrender.com",
                        "https://lifelink-blood-bank-management-system.onrender.com"
                )
        );

        configuration.setAllowedMethods(
                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "OPTIONS"
                )
        );

        configuration.setAllowedHeaders(
                List.of("*")
        );

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    // =========================
    // SECURITY FILTER CHAIN
    // =========================

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
                // Disable CSRF because we are using JWT
                .csrf(csrf -> csrf.disable())

                // Enable CORS
                .cors(cors -> cors.configurationSource(
                        corsConfigurationSource()
                ))

                // JWT based authentication
                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                // =========================
                // AUTHORIZATION
                // =========================

                .authorizeHttpRequests(auth -> auth

                        // =========================
                        // PUBLIC APIs
                        // =========================

                        .requestMatchers(
                                "/api/auth/**"
                        )
                        .permitAll()

                        // Available donation slots
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/donation-requests/available-slots"
                        )
                        .permitAll()

                        // Swagger
                        .requestMatchers(
                                "/v3/api-docs/**",
                                "/swagger-ui/**",
                                "/swagger-ui.html"
                        )
                        .permitAll()

                        // CORS preflight
                        .requestMatchers(
                                HttpMethod.OPTIONS,
                                "/**"
                        )
                        .permitAll()

                        // =========================
                        // ADMIN ONLY
                        // =========================

                        // Add Donor
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/donors"
                        )
                        .hasAuthority("ROLE_ADMIN")

                        // Update Donor
                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/donors/**"
                        )
                        .hasAuthority("ROLE_ADMIN")

                        // Delete Donor
                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/donors/**"
                        )
                        .hasAuthority("ROLE_ADMIN")

                        // View ALL Donation Requests
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/donation-requests"
                        )
                        .hasAuthority("ROLE_ADMIN")

                        // View specific Donation Request
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/donation-requests/*"
                        )
                        .hasAuthority("ROLE_ADMIN")

                        // Approve / Reject Donation Request
                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/donation-requests/*/status"
                        )
                        .hasAuthority("ROLE_ADMIN")

                        // Delete Donation Request
                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/donation-requests/*"
                        )
                        .hasAuthority("ROLE_ADMIN")

                        // =========================
                        // AUTHENTICATED USERS
                        // =========================

                        // Create Donation Request
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/donation-requests"
                        )
                        .authenticated()

                        // USER can view own donation request
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/donation-requests/my"
                        )
                        .authenticated()

                        // View Donors
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/donors/**"
                        )
                        .authenticated()

                        // =========================
                        // EVERYTHING ELSE
                        // =========================

                        .anyRequest()
                        .authenticated()
                );

        // =========================
        // JWT FILTER
        // =========================

        http.addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
        );

        return http.build();
    }
}