import { useMutation } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useSubmitHireForm() {
  const { actor, isFetching } = useActor();
  const mutation = useMutation({
    mutationFn: async (data: {
      name: string;
      serviceNeeded: string;
      budget: string;
      whatsappNumber: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitHireForm(
        data.name,
        data.serviceNeeded,
        data.budget,
        data.whatsappNumber,
      );
    },
  });
  return { ...mutation, isActorLoading: isFetching && !actor };
}

export function useSubmitFreelancerApplication() {
  const { actor, isFetching } = useActor();
  const mutation = useMutation({
    mutationFn: async (data: {
      name: string;
      role: string;
      experience: string;
      hourlyRate: string;
      whatsappNumber: string;
      portfolioLink: string;
      bio: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitFreelancerApplication(
        data.name,
        data.role,
        data.experience,
        data.hourlyRate,
        data.whatsappNumber,
        data.portfolioLink,
        data.bio,
      );
    },
  });
  return { ...mutation, isActorLoading: isFetching && !actor };
}
