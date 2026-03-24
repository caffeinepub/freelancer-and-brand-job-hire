# Freelancer and Brand Job Hire

## Current State
- Backend saves all HireSubmission fields: name, serviceNeeded, budget, whatsappNumber, timestamp
- AdminDashboard page exists at /admin with Internet Identity login
- Admin link is only in the footer, not visible in navigation
- The dashboard works but is not prominent or beginner-friendly enough

## Requested Changes (Diff)

### Add
- Prominent "HOW TO FIND YOUR DATA" info banner at top of Admin page (plain English instructions)
- Summary stat cards at top of dashboard showing total hire submissions and freelancer applications count
- "Admin Panel" link in the main navigation bar (visible on all pages)
- Each hire submission card should show all 4 fields very clearly with labels: Name, Service, Budget, WhatsApp Number

### Modify
- Admin Dashboard: improve layout so each submission card clearly labels every field
- Make the admin page more beginner-friendly with clear headings and instructions
- Footer admin link: make it more visible

### Remove
- Nothing removed

## Implementation Plan
1. Update AdminDashboard.tsx: add info banner explaining where data comes from, add stats summary cards, improve HireSubmissionCard to clearly label all 4 fields
2. Update Layout/navigation to include an Admin link in the nav bar
