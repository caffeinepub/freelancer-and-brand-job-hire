# Freelancer and Brand Job Hire

## Current State
Admin dashboard exists but shows "Access Denied" because no admin has been registered. The authorization system has `assignCallerUserRole` but there is no way to bootstrap the first admin.

## Requested Changes (Diff)

### Add
- Backend: `claimAdminIfNone` function that assigns admin role to caller only if zero admins exist currently
- Frontend: On the "Access Denied" screen, show a "Claim Admin Access" button that calls `claimAdminIfNone`, then refreshes the admin check

### Modify
- AdminDashboard.tsx: Add claim admin UI in the not-admin state

### Remove
- Nothing

## Implementation Plan
1. Add `claimAdminIfNone` to backend main.mo
2. Update backend.d.ts with the new function signature
3. Update AdminDashboard.tsx to show claim button and handle the flow
