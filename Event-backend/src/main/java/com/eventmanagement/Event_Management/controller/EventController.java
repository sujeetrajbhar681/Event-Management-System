package com.eventmanagement.Event_Management.controller;

import com.eventmanagement.Event_Management.model.*;
import com.eventmanagement.Event_Management.service.EventService;
import com.eventmanagement.Event_Management.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
public class EventController {

    @Autowired
    private UserService userService;
    @Autowired
    private EventService eventService;

    @PostMapping("register")
    public Registration register(@RequestBody Registration r) {
        return userService.register(r);
    }

    @PostMapping("login")
    public Registration login(@RequestBody Login login) {
        return userService.login(login);
    }

    @GetMapping("events")
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }

    @PostMapping("events/{eventId}/book")
    public Booking book(@PathVariable Long eventId, @RequestHeader("userId") Long userId) {
        return eventService.book(userId, eventId);
    }

    @GetMapping("users/{userId}/bookings")
    public List<Booking> myBookings(@PathVariable Long userId) {
        return eventService.getBookingsForUser(userId);
    }

    @PostMapping("events")
    public Event createEvent(@RequestBody Event event, @RequestHeader("userId") Long userId) {
        userService.requireAdmin(userId);
        return eventService.createEvent(event);
    }

    @GetMapping("events/{eventId}/registrations")
    public List<Booking> registrations(@PathVariable Long eventId, @RequestHeader("userId") Long userId) {
        userService.requireAdmin(userId);
        return eventService.getRegistrationsForEvent(eventId);
    }
}
