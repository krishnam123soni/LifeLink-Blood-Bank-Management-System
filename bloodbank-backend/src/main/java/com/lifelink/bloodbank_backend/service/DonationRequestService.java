package com.lifelink.bloodbank_backend.service;

import com.lifelink.bloodbank_backend.entity.DonationRequest;
import com.lifelink.bloodbank_backend.entity.Donor;
import com.lifelink.bloodbank_backend.repository.DonationRequestRepository;
import com.lifelink.bloodbank_backend.repository.DonorRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Service
public class DonationRequestService {

    private final DonationRequestRepository donationRequestRepository;
    private final DonorRepository donorRepository;

    public DonationRequestService(
            DonationRequestRepository donationRequestRepository,
            DonorRepository donorRepository) {

        this.donationRequestRepository = donationRequestRepository;
        this.donorRepository = donorRepository;
    }

    // =========================
    // CREATE DONATION REQUEST
    // =========================

    public DonationRequest createRequest(DonationRequest request) {

    // Check user's latest donation request
    Optional<DonationRequest> previousRequest =
            donationRequestRepository
                    .findTopByEmailOrderByIdDesc(request.getEmail());

    // If previous request is still pending
    if (previousRequest.isPresent()
            && "PENDING".equalsIgnoreCase(previousRequest.get().getStatus())) {

        throw new ResponseStatusException(
    HttpStatus.CONFLICT,
    "You already have a pending donation request."
);
    }

    // New request starts with PENDING status
    request.setStatus("PENDING");

    // Generate token
    String token = generateToken();

    request.setTokenNumber(token);

    return donationRequestRepository.save(request);
}

    // =========================
    // GENERATE TOKEN
    // =========================

    private String generateToken() {

        long number = System.currentTimeMillis() % 100000;

        return "LL-" + number;
    }

    // =========================
    // GET ALL REQUESTS
    // =========================

    public List<DonationRequest> getAllRequests() {

        return donationRequestRepository.findAll();
    }
    // =========================
// GET MY DONATION REQUEST
// =========================

public DonationRequest getMyRequest(String email) {

    return donationRequestRepository
            .findTopByEmailOrderByIdDesc(email)
            .orElse(null);
}

    // =========================
    // GET REQUEST BY ID
    // =========================

    public DonationRequest getRequestById(Long id) {

        return donationRequestRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Donation request not found with id: " + id
                        ));
    }

    // =========================
    // UPDATE REQUEST STATUS
    // =========================

    public DonationRequest updateStatus(
            Long id,
            String status) {

        DonationRequest request = getRequestById(id);

        request.setStatus(status);

        // =========================
        // WHEN ADMIN APPROVES
        // =========================

        if ("APPROVED".equalsIgnoreCase(status)) {

            createDonorFromRequest(request);
        }

        return donationRequestRepository.save(request);
    }

    // =========================
    // CREATE DONOR FROM REQUEST
    // =========================

    private void createDonorFromRequest(DonationRequest request) {

    // Check duplicate by email
    if (donorRepository.findByEmail(request.getEmail()).isPresent()) {
        System.out.println("Donor already exists with email: " + request.getEmail());
        return;
    }

    // Check duplicate by phone
    if (donorRepository.findByPhone(request.getPhone()).isPresent()) {
        System.out.println("Donor already exists with phone: " + request.getPhone());
        return;
    }

    Donor donor = new Donor();

    donor.setFullName(request.getFullName());
    donor.setAge(request.getAge());
    donor.setGender(request.getGender());
    donor.setBloodGroup(request.getBloodGroup());
    donor.setPhone(request.getPhone());
    donor.setEmail(request.getEmail());
    donor.setCity(request.getCity());
    donor.setAddress(request.getAddress());
    donor.setAvailable(true);

    donorRepository.save(donor);

    System.out.println("NEW DONOR CREATED: " + donor.getFullName());
}

    // =========================
    // DELETE REQUEST
    // =========================

    public void deleteRequest(Long id) {

        DonationRequest request = getRequestById(id);

        donationRequestRepository.delete(request);
    }

    // =========================
    // AVAILABLE DONATION SLOTS
    // =========================

    public List<String> getAvailableSlots(LocalDate date) {

        List<String> allSlots = Arrays.asList(
                "10:00 AM - 11:00 AM",
                "11:00 AM - 12:00 PM",
                "12:00 PM - 01:00 PM",
                "03:00 PM - 04:00 PM",
                "04:00 PM - 05:00 PM"
        );

        List<String> bookedSlots = donationRequestRepository
                .findByDonationDate(date)
                .stream()
                .map(DonationRequest::getDonationSlot)
                .toList();

        return allSlots.stream()
                .filter(slot -> !bookedSlots.contains(slot))
                .toList();
    }
}