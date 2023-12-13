package org.wecancodeit.virtualpet4.controllers;

import org.wecancodeit.virtualpet4.enums.RoleEnum;
import org.wecancodeit.virtualpet4.models.ShelterModel;
import org.wecancodeit.virtualpet4.repositories.ShelterRepository;
import org.wecancodeit.virtualpet4.repositories.UserRepository;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/shelter")
public class ShelterController extends BaseController {

    @Resource
    private ShelterRepository shelterRepository;
    @Resource
    private UserRepository userRepository;

    public ShelterController(UserRepository userRepository, ShelterRepository shelterRepository) {
        super(userRepository);
        this.shelterRepository = shelterRepository;
    }

    @GetMapping("")
    public ResponseEntity<?> getAllShelters(HttpServletRequest request) {
        try {
            checkAccess(RoleEnum.GUEST, request);
            return ResponseEntity.ok(shelterRepository.findAll());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getShelterById(@PathVariable long id, HttpServletRequest request) {
        try {
            checkAccess(RoleEnum.GUEST, request);
            return ResponseEntity.ok(shelterRepository.findById(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/pets/{id}")
    public ResponseEntity<?> getPetsById(@PathVariable long id, HttpServletRequest request) {
        try {
            checkAccess(RoleEnum.GUEST, request);
            Optional<ShelterModel> opShelter = shelterRepository.findById(id);
            if (opShelter.isPresent()) {
                return ResponseEntity.ok(opShelter.get().getPets());
            }
            return ResponseEntity.ok("Shelter not found");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteShelter(@PathVariable long id, HttpServletRequest request) {
        try {
            checkAccess(RoleEnum.ADMIN, request);
            shelterRepository.deleteById(id);
            Optional<ShelterModel> shelter = shelterRepository.findById(id);
            return ResponseEntity.ok(!shelter.isPresent());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // @PutMapping() //no double mappings allowed
    // @PostMapping()
    @RequestMapping(method = { RequestMethod.POST, RequestMethod.PUT })
    public ResponseEntity<?> update(@RequestBody ShelterModel shelter, HttpServletRequest request) {
        try {
            checkAccess(RoleEnum.MANAGER, request);
            return ResponseEntity.ok(shelterRepository.save(shelter));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
