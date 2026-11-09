package com.eventmanagement.Event_Management.service;

import com.eventmanagement.Event_Management.model.Booking;
import com.eventmanagement.Event_Management.model.Event;
import com.eventmanagement.Event_Management.model.Registration;
import com.eventmanagement.Event_Management.repo.BookingRepo;
import com.eventmanagement.Event_Management.repo.EventRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventRepo eventRepo;
    @Autowired
    private BookingRepo bookingRepo;
    @Autowired
    private UserService userService;

    public List<Event> getAllEvents() {
        return eventRepo.findAll();
    }

    public Event createEvent(Event e) {
        e.setId(null);
        return eventRepo.save(e);
    }

    public Event getEvent(Long id) {
        return eventRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));
    }

    public Booking book(Long userId, Long eventId) {
        Registration user = userService.getUser(userId);
        Event event = getEvent(eventId);
        if (bookingRepo.existsByUserIdAndEventId(userId, eventId))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Already booked");
        if (event.getCapacity() > 0 && bookingRepo.countByEventId(eventId) >= event.getCapacity())
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Event is full");
        Booking b = new Booking();
        b.setUser(user);
        b.setEvent(event);
        return bookingRepo.save(b);
    }

    public List<Booking> getRegistrationsForEvent(Long eventId) {
        getEvent(eventId);
        return bookingRepo.findByEventId(eventId);
    }

    public List<Booking> getBookingsForUser(Long userId) {
        return bookingRepo.findByUserId(userId);
    }
}
