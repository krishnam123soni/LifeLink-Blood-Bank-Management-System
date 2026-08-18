package com.lifelink.bloodbank_backend.controller;

import com.lifelink.bloodbank_backend.entity.Donor;
import com.lifelink.bloodbank_backend.service.DonorService;
import com.lifelink.bloodbank_backend.dto.DonorDTO;


import jakarta.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donors")
public class DonorController {

    private final DonorService donorService;

    public DonorController(DonorService donorService) {
        this.donorService = donorService;
    }

    // =========================
    // GET - USER + ADMIN
    // =========================

    @GetMapping
    public List<DonorDTO> getAllDonors() {
        return donorService.getAllDonors();
    }

    @GetMapping("/search/blood-group")
    public List<DonorDTO> searchByBloodGroup(
            @RequestParam String bloodGroup) {

        return donorService.searchByBloodGroup(bloodGroup);
    }

    @GetMapping("/search/city")
    public List<DonorDTO> searchByCity(
            @RequestParam String city) {

        return donorService.searchByCity(city);
    }

    @GetMapping("/{id}")
    public Donor getDonorById(@PathVariable Long id) {
        return donorService.getDonorById(id);
    }

    @GetMapping("/page")
    public Page<DonorDTO> getDonorsWithPagination(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        return donorService.getDonorsWithPagination(page, size);
    }

    @GetMapping("/sort")
    public List<DonorDTO> getDonorsWithSorting(
            @RequestParam(defaultValue = "fullName") String field) {

        return donorService.getDonorsWithSorting(field);
    }


    // =========================
    // POST - ADMIN ONLY
    // =========================

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping
    public Donor saveDonor(
            @Valid @RequestBody Donor donor) {

        return donorService.saveDonor(donor);
    }


    // =========================
    // PUT - ADMIN ONLY
    // =========================

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/{id}")
    public Donor updateDonor(
            @PathVariable Long id,
            @Valid @RequestBody Donor donor) {

        return donorService.updateDonor(id, donor);
    }


    // =========================
    // DELETE - ADMIN ONLY
    // =========================

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteDonor(@PathVariable Long id) {

        donorService.deleteDonor(id);

        return "Donor deleted successfully!";
    }
}