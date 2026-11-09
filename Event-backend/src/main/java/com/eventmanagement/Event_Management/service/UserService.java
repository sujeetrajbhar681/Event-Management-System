package com.eventmanagement.Event_Management.service;

import com.eventmanagement.Event_Management.model.Login;
import com.eventmanagement.Event_Management.model.Registration;
import com.eventmanagement.Event_Management.repo.RegistrationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.HexFormat;

@Service
public class UserService {

    @Autowired
    private RegistrationRepo repo;

    static String hash(String raw) {
        try {
            byte[] d = MessageDigest.getInstance("SHA-256").digest(raw.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(d);
        } catch (Exception e) {
            throw new IllegalStateException(e);
        }
    }

    public Registration register(Registration r) {
        if (r.getUserName() == null || r.getUserName().isBlank() || r.getPassword() == null || r.getPassword().isBlank())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "userName and password are required");
        if (repo.existsByUserName(r.getUserName()))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username already taken");
        r.setId(null);
        r.setRole("USER");
        r.setPassword(hash(r.getPassword()));
        return repo.save(r);
    }

    public Registration login(Login login) {
        Registration u = repo.findByUserName(login.getUserName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));
        if (login.getPassword() == null || !u.getPassword().equals(hash(login.getPassword())))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        return u;
    }

    public Registration getUser(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unknown user"));
    }

    public Registration requireAdmin(Long userId) {
        Registration u = getUser(userId);
        if (!"ADMIN".equals(u.getRole()))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Admin only");
        return u;
    }

    public void seedAdmin() {
        if (!repo.existsByUserName("admin")) {
            Registration a = new Registration();
            a.setUserName("admin");
            a.setEmail("admin@example.com");
            a.setPassword(hash("admin123"));
            a.setRole("ADMIN");
            repo.save(a);
        }
    }
}
