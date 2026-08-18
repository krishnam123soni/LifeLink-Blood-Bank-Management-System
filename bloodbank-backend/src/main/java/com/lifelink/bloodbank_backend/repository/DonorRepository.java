package com.lifelink.bloodbank_backend.repository;

import com.lifelink.bloodbank_backend.entity.Donor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DonorRepository extends JpaRepository<Donor, Long> {

    List<Donor> findByBloodGroup(String bloodGroup);

    List<Donor> findByCity(String city);

}

