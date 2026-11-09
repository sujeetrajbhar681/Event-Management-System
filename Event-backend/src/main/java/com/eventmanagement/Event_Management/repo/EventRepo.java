package com.eventmanagement.Event_Management.repo;

import com.eventmanagement.Event_Management.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepo extends JpaRepository<Event, Long> {
}
