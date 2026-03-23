import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface HireSubmission {
    name: string;
    whatsappNumber: string;
    timestamp: Time;
    budget: string;
    serviceNeeded: string;
}
export type Time = bigint;
export interface backendInterface {
    getAllSubmissions(): Promise<Array<HireSubmission>>;
    submitHireForm(name: string, serviceNeeded: string, budget: string, whatsappNumber: string): Promise<bigint>;
}
