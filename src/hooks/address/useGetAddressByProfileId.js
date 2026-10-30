import { useQuery } from "@tanstack/react-query";
import addressService from "../../services/addressService";

export default function useGetAddressByProfileId(profileId) {
    return useQuery(
        {
            queryKey: ["address", profileId],
            queryFn: ({ queryKey }) => {
                const [, id] = queryKey;
                return addressService.getAddressByProfileId(id)
            },
            enabled: !!profileId,
            staleTime: 5 * 60 * 1000,
            retry: 1
        }
    )
}
