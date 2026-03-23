import Time "mo:core/Time";
import Int "mo:core/Int";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Principal "mo:core/Principal";

actor {
  type HireSubmission = {
    name : Text;
    serviceNeeded : Text;
    budget : Text;
    whatsappNumber : Text;
    timestamp : Time.Time;
  };

  module HireSubmission {
    public func compare(a : HireSubmission, b : HireSubmission) : Order.Order {
      Int.compare(b.timestamp, a.timestamp);
    };
  };

  let admin = Principal.fromText("2vxsx-fae");
  let submissions = Map.empty<Nat, HireSubmission>();
  var nextId = 0;

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

  public query ({ caller }) func getAllSubmissions() : async [HireSubmission] {
    if (caller != admin) { return [] };
    submissions.values().toArray().sort();
  };
};
