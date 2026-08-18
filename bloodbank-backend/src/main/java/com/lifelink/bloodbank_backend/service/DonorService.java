package com.lifelink.bloodbank_backend.service;
import com.lifelink.bloodbank_backend.exception.DonorNotFoundException;
import com.lifelink.bloodbank_backend.dto.DonorDTO;
import com.lifelink.bloodbank_backend.entity.Donor;
import com.lifelink.bloodbank_backend.repository.DonorRepository;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;
import java.util.stream.Collectors;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
@Service                                                                                                
public class DonorService {

    private final DonorRepository donorRepository;
    private final ModelMapper modelMapper;

   public DonorService(DonorRepository donorRepository,
                    ModelMapper modelMapper) {

    this.donorRepository = donorRepository;
    this.modelMapper = modelMapper;
}
    public List<DonorDTO> getAllDonors() {

    return donorRepository.findAll()
            .stream()
            .map(donor -> modelMapper.map(donor, DonorDTO.class))
            .collect(Collectors.toList());
}

    public Donor saveDonor(Donor donor) {
        return donorRepository.save(donor);
    }

   public Donor getDonorById(Long id) {
    return donorRepository.findById(id)
            .orElseThrow(() -> new DonorNotFoundException("Donor not found with id: " + id));
}

public Donor updateDonor(Long id, Donor donor) {
   Donor existing = donorRepository.findById(id)
        .orElseThrow(() -> new DonorNotFoundException("Donor not found with id: " + id));

    if (existing != null) {
        existing.setFullName(donor.getFullName());
        existing.setAge(donor.getAge());
        existing.setGender(donor.getGender());
        existing.setBloodGroup(donor.getBloodGroup());
        existing.setPhone(donor.getPhone());
        existing.setEmail(donor.getEmail());
        existing.setCity(donor.getCity());
        existing.setAddress(donor.getAddress());
        existing.setAvailable(donor.getAvailable());

        return donorRepository.save(existing);
    }

    return null;
}

public void deleteDonor(Long id) {

    Donor donor = donorRepository.findById(id)
            .orElseThrow(() -> new DonorNotFoundException("Donor not found with id: " + id));

    donorRepository.delete(donor);
}
public List<DonorDTO> searchByBloodGroup(String bloodGroup) {

    return donorRepository.findByBloodGroup(bloodGroup)
            .stream()
            .map(donor -> modelMapper.map(donor, DonorDTO.class))
            .toList();
}

public List<DonorDTO> searchByCity(String city) {

    return donorRepository.findByCity(city)
            .stream()
            .map(donor -> modelMapper.map(donor, DonorDTO.class))
            .toList();
}
public Page<DonorDTO> getDonorsWithPagination(int page, int size) {

    Pageable pageable = PageRequest.of(page, size);

    return donorRepository.findAll(pageable)
            .map(donor -> modelMapper.map(donor, DonorDTO.class));
}
public List<DonorDTO> getDonorsWithSorting(String field) {

    return donorRepository.findAll(Sort.by(Sort.Direction.ASC, field))
            .stream()
            .map(donor -> modelMapper.map(donor, DonorDTO.class))
            .toList();
}
 }
 