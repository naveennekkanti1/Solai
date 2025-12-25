package org.example;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Admin {

    private int adminId;
    private String adminType; // Hardware / Software

    static List<Ticket> softwareTickets = new ArrayList<>();
    static List<Ticket> hardwareTickets = new ArrayList<>();

    public Admin(int adminId, String adminType) {
        this.adminId = adminId;
        this.adminType = adminType;
    }

    // Add note
    public void addNote(long ticketId, String note) {
        Ticket t = findTicket(ticketId);
        if (t != null) t.addNote(note);
    }

    // Edit note
    public void editNote(long ticketId, String oldNoteText, String newNoteText) {
        Ticket ticket = findTicket(ticketId);

        if (ticket == null) {
            System.out.println("Ticket not found.");
            return;
        }

        boolean updated = ticket.replaceNote(oldNoteText, newNoteText);

        if (!updated) {
            System.out.println("Matching note not found.");
        } else {
            System.out.println("Note updated successfully.");
        }
    }


    // Reassign ticket
    public void reassignTicket(long ticketId, String targetTeam) {
        Ticket t = findTicket(ticketId);
        if (t == null) return;

        // Remove from old list
        softwareTickets.remove(t);
        hardwareTickets.remove(t);

        // Add to new team
        if ("Software".equalsIgnoreCase(targetTeam)) {
            softwareTickets.add(t);
        } else {
            hardwareTickets.add(t);
        }

        t.changeStatus(TicketStatus.MOVED);
    }

    // Update status (same team)
    public void updateStatus(long ticketId, TicketStatus status) {
        Ticket t = findTicket(ticketId);
        if (t != null) {
            t.changeStatus(status);
        }
    }

    // Propose resolution
    public void proposeResolution(long ticketId, String resolution) {
        Ticket t = findTicket(ticketId);
        if (t != null) {
            t.proposeResolution(resolution);
        }
    }

//    public void viewEscalations(long ticketId) {
//        Ticket t = findTicket(ticketId);
//    }

    // Close ticket
    public void closeTicket(long ticketId) {
        Ticket t = findTicket(ticketId);
        if (t != null) {
            t.closeTicket();
        }
    }

    // Search tickets
    public List<Ticket> searchMyTickets(Optional<TicketStatus> status,
                                        Optional<LocalDate> start,
                                        Optional<LocalDate> end) {

        List<Ticket> list = adminType.equalsIgnoreCase("Software")
                ? softwareTickets : hardwareTickets;

        return list.stream()
                .filter(t -> status.map(s -> t.getStatus() == s).orElse(true))
                .filter(t -> start.map(s -> !t.getCreatedAt().toLocalDate().isBefore(s)).orElse(true))
                .filter(t -> end.map(e -> !t.getCreatedAt().toLocalDate().isAfter(e)).orElse(true))
                .collect(Collectors.toList());
    }

    // Report
    public static List<Ticket> getReport(List<Ticket> tickets) {
        return tickets.stream()
                .filter(t -> t.getStatus() != TicketStatus.OPEN)
                .collect(Collectors.toList());
    }

    private Ticket findTicket(long id) {
        return Stream.concat(softwareTickets.stream(), hardwareTickets.stream())
                .filter(t -> t.getTicketId() == id)
                .findFirst()
                .orElse(null);
    }
}
