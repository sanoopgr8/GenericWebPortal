package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/settings")
@CrossOrigin(origins = "http://localhost:5173")
public class SettingsController {

    @Autowired
    private MailConfigRepository mailConfigRepository;

    @GetMapping("/mail")
    public ResponseEntity<MailConfig> getMailConfig() {
        // We assume there is always one row with ID 1
        return mailConfigRepository.findById(1L)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/mail")
    public ResponseEntity<MailConfig> updateMailConfig(@RequestBody MailConfig newConfig) {
        newConfig.setId(1L); // Ensure we always update the single record
        MailConfig saved = mailConfigRepository.save(newConfig);
        return ResponseEntity.ok(saved);
    }
}
