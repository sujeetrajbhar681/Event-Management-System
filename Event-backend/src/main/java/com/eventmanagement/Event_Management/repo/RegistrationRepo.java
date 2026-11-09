package com.eventmanagement.Event_Management.repo;

import com.eventmanagement.Event_Management.model.Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RegistrationRepo extends JpaRepository<Registration, Long> {

    Optional<Registration> findByUserName(String userName);
    boolean existsByUserName(String userName);

}
