package org.example;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class Ticket {

    private long ticketId;
    private String ticketType; // Hardware / Software
    private TicketStatus status;
    private LocalDateTime createdAt;
    private boolean escalated;

    private List<String> notes = new ArrayList<>();
    private String resolution;

    public Ticket(long ticketId, String ticketType) {
        this.ticketId = ticketId;
        this.ticketType = ticketType;
        this.status = TicketStatus.OPEN;
        this.createdAt = LocalDateTime.now();
    }

    // Notes
    public void addNote(String note) {
        notes.add(note);
    }

    public boolean replaceNote(String oldText, String newText) {

        for (int i = 0; i < notes.size(); i++) {
            if (notes.get(i).contains(oldText)) {

                // Preserve history (best practice)
                notes.add(LocalDateTime.now() + " : EDITED FROM -> " + notes.get(i));
                notes.set(i, LocalDateTime.now() + " : " + newText);
                return true;
            }
        }
        return false;
    }


    public List<String> getNotes() {
        return notes;
    }

    // Resolution
    public void proposeResolution(String resolution) {
        this.resolution = resolution;
        this.status = TicketStatus.IN_PROGRESS;
    }

    public void closeTicket() {
        if (resolution == null) {
            throw new IllegalStateException("Resolution must be proposed before closing");
        }
        this.status = TicketStatus.CLOSED;
    }

    // Getters
    public long getTicketId() { return ticketId; }
    public String getTicketType() { return ticketType; }
    public TicketStatus getStatus() { return status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public boolean isEscalated() { return escalated; }

    public void changeStatus(TicketStatus status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Ticket{" +
                "id=" + ticketId +
                ", type='" + ticketType + '\'' +
                ", status=" + status +
                ", notes=" + notes +
                ", resolution='" + resolution + '\'' +
                '}';
    }
}
