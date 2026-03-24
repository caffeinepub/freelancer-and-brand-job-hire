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

  // User profile management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
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
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all submissions");
    };
    submissions.values().toArray().sort();
  };

  public query ({ caller }) func getFreelancerApplications() : async [FreelancerApplication] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view freelancer applications");
    };
    freelancerApplications.toArray().sort();
  };
};

