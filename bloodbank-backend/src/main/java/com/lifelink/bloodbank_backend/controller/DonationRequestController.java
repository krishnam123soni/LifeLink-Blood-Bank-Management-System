package com.lifelink.bloodbank_backend.controller;

import com.lifelink.bloodbank_backend.entity.DonationRequest;
import com.lifelink.bloodbank_backend.service.DonationRequestService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/donation-requests")
public class DonationRequestController {

    private final DonationRequestService donationRequestService;

    public DonationRequestController(
            DonationRequestService donationRequestService) {

        this.donationRequestService = donationRequestService;
    }

    // =========================
    // POST - CREATE DONATION REQUEST
    // =========================

    @PostMapping
    public DonationRequest createRequest(
            @Valid @RequestBody DonationRequest request) {

        return donationRequestService.createRequest(request);
    }

    // =========================
    // GET - ALL DONATION REQUESTS
    // =========================

    @GetMapping
    public List<DonationRequest> getAllRequests() {

        return donationRequestService.getAllRequests();
    }
       @GetMapping("/my")
public DonationRequest getMyRequest(
        org.springframework.security.core.Authentication authentication) {

    String email = authentication.getName();

    return donationRequestService.getMyRequest(email);
}
    // =========================
    // GET - AVAILABLE SLOTS
    // =========================

    @GetMapping("/available-slots")
    public List<String> getAvailableSlots(
            @RequestParam LocalDate date) {

        return donationRequestService.getAvailableSlots(date);
    }

    // =========================
    // GET - REQUEST BY ID
    // =========================

    @GetMapping("/{id}")
    public DonationRequest getRequestById(
            @PathVariable Long id) {

        return donationRequestService.getRequestById(id);
    }

    // =========================
    // PUT - UPDATE STATUS
    // =========================

    @PutMapping("/{id}/status")
    public DonationRequest updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        return donationRequestService.updateStatus(id, status);
    }

    // =========================
    // DELETE - REQUEST
    // =========================

    @DeleteMapping("/{id}")
    public String deleteRequest(
            @PathVariable Long id) {

        donationRequestService.deleteRequest(id);

        return "Donation request deleted successfully!";
    }
}