package com.lifelink.bloodbank_backend.repository;

import com.lifelink.bloodbank_backend.entity.DonationRequest;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DonationRequestRepository
        extends JpaRepository<DonationRequest, Long> {

    List<DonationRequest> findByDonationDate(LocalDate donationDate);
    Optional<DonationRequest> findTopByEmailOrderByIdDesc(String email);
}