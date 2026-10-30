import { useQuery } from "@tanstack/react-query"
import couponService from "../../services/couponService"

export default function useGetCoupons() {
    return useQuery({
        queryKey: ["coupons"],
        queryFn: async () => couponService.getCoupons(),
        select: (res) => res.data.data,
        keepPreviousData: true,
        staleTime: 1000 * 60,
        retry: 1,
    })
}
