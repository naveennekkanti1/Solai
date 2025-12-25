package org.example;

import java.util.Optional;
import java.util.Scanner;

public class Main {

    private static final Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {

        // Admin
        Admin admin = new Admin(1, "Software");

//        // User
//        User user1 = new User(101, "Naveen");

        // Tickets
        Ticket t1 = new Ticket(1001, "Software");
        Ticket t2 = new Ticket(1002, "Hardware");

        Admin.softwareTickets.add(t1);
        Admin.hardwareTickets.add(t2);

        // ---------------- LOGIN LOOP ----------------
        while (true) {

            System.out.println("\n=== LOGIN ===");
            System.out.print("Username: ");
            String u = scanner.nextLine();
            System.out.print("Password: ");
            String p = scanner.nextLine();

            // Hardcoded login for demo
            if (!u.equals("admin") || !p.equals("admin@123")) {
                System.out.println("Invalid credentials!");
                continue;
            }

            System.out.println("Login Successful");

            boolean logout = false;

            while (!logout) {

                System.out.println("\n====== ADMIN MENU ======");
                System.out.println("1. View My Tickets");
                System.out.println("2. Add Note");
                System.out.println("3. Edit Note");
                System.out.println("4. Propose Resolution");
                System.out.println("5. Close Ticket");
                System.out.println("6. Reassign Ticket");
                System.out.println("7. Search Tickets by User");
                System.out.println("8. View Report");
                System.out.println("9. View Escalations");
                System.out.println("10. Logout");
                System.out.print("Enter choice: ");

                int choice = scanner.nextInt();
                scanner.nextLine();

                switch (choice) {

                    case 1 -> viewAll(admin);
                    case 2 -> addNote(admin);
                    case 3 -> editNote(admin);
                    case 4 -> proposeResolution(admin);
                    case 5 -> closeTicket(admin);
                    case 6 -> reassignTicket(admin);
                    case 7 -> searchForUser();
                    case 8 -> viewReport(admin);
//                    case 9 -> viewEscalations(admin);
                    case 10 -> {
                        logout = true;
                        System.out.println("Logged out.");
                    }
                    default -> System.out.println("Invalid choice");
                }
            }
        }
    }

    // ---------------- FEATURES ----------------

    private static void viewAll(Admin admin) {
        admin.searchMyTickets(Optional.empty(), Optional.empty(), Optional.empty())
                .forEach(System.out::println);
    }

    private static void addNote(Admin admin) {
        System.out.print("Ticket ID: ");
        long id = scanner.nextLong();
        scanner.nextLine();

        System.out.print("Note: ");
        String note = scanner.nextLine();

        admin.addNote(id, note);
        System.out.println("Note added.");
    }

    private static void editNote(Admin admin) {

        System.out.print("Ticket ID: ");
        long id = scanner.nextLong();
        scanner.nextLine();

        System.out.print("Existing Note Text: ");
        String oldNote = scanner.nextLine();

        System.out.print("Updated Note: ");
        String newNote = scanner.nextLine();

        admin.editNote(id, oldNote, newNote);
    }



    private static void proposeResolution(Admin admin) {
        System.out.print("Ticket ID: ");
        long id = scanner.nextLong();
        scanner.nextLine();

        System.out.print("Resolution: ");
        String res = scanner.nextLine();

        admin.proposeResolution(id, res);
        System.out.println("Resolution proposed. Status → IN_PROGRESS");
    }

    private static void closeTicket(Admin admin) {
        System.out.print("Ticket ID: ");
        long id = scanner.nextLong();

        try {
            admin.closeTicket(id);
            System.out.println("Ticket closed successfully.");
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    private static void reassignTicket(Admin admin) {
        System.out.print("Ticket ID: ");
        long id = scanner.nextLong();
        scanner.nextLine();

        System.out.print("Reassign to team (Software / Hardware): ");
        String team = scanner.nextLine();

        admin.reassignTicket(id, team);
        System.out.println("Ticket reassigned. Status → MOVED");
    }

    private static void searchForUser() {
        System.out.print("User ID: ");
        int uid = scanner.nextInt();

        Admin.softwareTickets.stream()
                .filter(t -> t.getTicketId() == uid)
                .forEach(System.out::println);

        Admin.hardwareTickets.stream()
                .filter(t -> t.getTicketId() == uid)
                .forEach(System.out::println);
    }

    private static void viewReport(Admin admin) {
        System.out.println("---- REPORT (Non-OPEN tickets) ----");
        Admin.getReport(admin.searchMyTickets(Optional.empty(), Optional.empty(), Optional.empty()))
                .forEach(System.out::println);
    }

//    private static void viewEscalations(Admin admin) {
//        System.out.println("---- ESCALATED TICKETS ----");
//        Admin.viewEscalations(admin.searchMyTickets(Optional.empty(), Optional.empty(), Optional.empty()))
//                .forEach(System.out::println);
//    }
}
