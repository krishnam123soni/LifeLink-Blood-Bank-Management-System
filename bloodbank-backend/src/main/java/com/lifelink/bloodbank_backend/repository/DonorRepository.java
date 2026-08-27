package com.lifelink.bloodbank_backend.repository;

import com.lifelink.bloodbank_backend.entity.Donor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DonorRepository extends JpaRepository<Donor, Long> {

    List<Donor> findByBloodGroup(String bloodGroup);

    List<Donor> findByCity(String city);

    Optional<Donor> findByEmail(String email);

    Optional<Donor> findByPhone(String phone);
}