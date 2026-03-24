# Freelancer and Brand Job Hire

## Current State
Admin dashboard uses `stable var adminClaimedPrincipal` to track admin. The `claimAdminIfNone` function only allows claiming once. Every new deployment resets stable state, causing "Access Denied" permanently until user can claim again -- but once the previous deploy set a claim, subsequent deploys may appear to still block.

## Requested Changes (Diff)

### Add
- New backend function `claimAdmin` that always sets the caller as admin (replaces any existing claim)
- Show a "Re-claim Admin" button on the access denied screen when the user is logged in

### Modify
- Backend: Replace `claimAdminIfNone` with `claimAdmin` that always succeeds (any logged-in user can claim admin)
- Frontend: Update claim button to use new function, update messaging to be clearer

### Remove
- The "only once" restriction on admin claiming (since state resets on every deploy)

## Implementation Plan
1. Update backend `claimAdminIfNone` to always set admin (rename logic, keep same function name for compatibility)
2. Add new `claimAdmin` function that always succeeds
3. Update AdminDashboard.tsx to use `claimAdmin` and show clearer instructions
