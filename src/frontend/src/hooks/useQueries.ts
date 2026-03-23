import { useMutation } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useSubmitHireForm() {
  const { actor } = useActor();
  return useMutation({
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
}
