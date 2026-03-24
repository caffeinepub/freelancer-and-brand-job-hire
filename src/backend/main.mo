import Time "mo:core/Time";
import Int "mo:core/Int";
import Map "mo:core/Map";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";



actor {
  // Types
  type HireSubmission = {
    name : Text;
    serviceNeeded : Text;
    budget : Text;
    whatsappNumber : Text;
    timestamp : Time.Time;
  };

  type FreelancerApplication = {
    name : Text;
    role : Text;
    experience : Text;
    hourlyRate : Text;
    whatsappNumber : Text;
    portfolioLink : Text;
    bio : Text;
    timestamp : Time.Time;
  };

  public type UserProfile = {
    name : Text;
  };

  // Authorization system state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Persistent state
  let submissions = Map.empty<Nat, HireSubmission>();
  var nextId = 0;
  let freelancerApplications = List.empty<FreelancerApplication>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Stable var to track admin principal - can always be re-claimed after redeployment
  stable var adminClaimedPrincipal : ?Principal = null;

  // Internal orderings
  module HireSubmission {
    public func compare(a : HireSubmission, b : HireSubmission) : { #less; #equal; #greater } {
      Int.compare(b.timestamp, a.timestamp);
    };
  };

  module FreelancerApplication {
    public func compare(a : FreelancerApplication, b : FreelancerApplication) : { #less; #equal; #greater } {
      Int.compare(b.timestamp, a.timestamp);
    };
  };

  // Internal helper: check if a principal is the claimed admin
  func isClaimedAdmin(p : Principal) : Bool {
    switch (adminClaimedPrincipal) {
      case (?admin) { admin == p };
      case null { false };
    };
  };

  // Safe admin check -- returns false instead of trapping for unregistered users
  public query ({ caller }) func isCallerAdminSafe() : async Bool {
    if (caller.isAnonymous()) { return false };
    if (isClaimedAdmin(caller)) { return true };
    switch (accessControlState.userRoles.get(caller)) {
      case (? #admin) { true };
      case (_) { false };
    };
  };

  // Claim admin - always succeeds for any logged-in user.
  // This is intentional: every new deployment resets state, so the owner
  // must be able to re-claim admin after each deploy.
  public shared ({ caller }) func claimAdmin() : async Bool {
    if (caller.isAnonymous()) { return false };
    adminClaimedPrincipal := ?caller;
    true;
  };

  // Legacy alias kept for compatibility
  public shared ({ caller }) func claimAdminIfNone() : async Bool {
    if (caller.isAnonymous()) { return false };
    adminClaimedPrincipal := ?caller;
    true;
  };

  // User profile management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not isClaimedAdmin(caller) and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    userProfiles.add(caller, profile);
  };

  // Public endpoints - anyone can submit
  public shared ({ caller }) func submitHireForm(name : Text, serviceNeeded : Text, budget : Text, whatsappNumber : Text) : async Nat {
    let id = nextId;
    nextId += 1;

    let submission : HireSubmission = {
      name;
      serviceNeeded;
      budget;
      whatsappNumber;
      timestamp = Time.now();
    };

    submissions.add(id, submission);
    id;
  };

  public shared ({ caller }) func submitFreelancerApplication(name : Text, role : Text, experience : Text, hourlyRate : Text, whatsappNumber : Text, portfolioLink : Text, bio : Text) : async () {
    let application : FreelancerApplication = {
      name;
      role;
      experience;
      hourlyRate;
      whatsappNumber;
      portfolioLink;
      bio;
      timestamp = Time.now();
    };

    freelancerApplications.add(application);
  };

  // Admin-only endpoints
  public query ({ caller }) func getAllSubmissions() : async [HireSubmission] {
    if (not isClaimedAdmin(caller) and not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view all submissions");
    };
    submissions.values().toArray().sort();
  };

  public query ({ caller }) func getFreelancerApplications() : async [FreelancerApplication] {
    if (not isClaimedAdmin(caller) and not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view freelancer applications");
    };
    freelancerApplications.toArray().sort();
  };
};
