package com.eventmanagement.Event_Management.repo;

import com.eventmanagement.Event_Management.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepo extends JpaRepository<Booking, Long> {

    List<Booking> findByEventId(Long eventId);
    List<Booking> findByUserId(Long userId);
    boolean existsByUserIdAndEventId(Long userId, Long eventId);
    long countByEventId(Long eventId);

}
