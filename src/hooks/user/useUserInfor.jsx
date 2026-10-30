import { useQuery } from '@tanstack/react-query'
import userService from '@/services/userService'
export default function useUserInfor() {
    return useQuery({
        queryKey: ["userInfo"],
        queryFn: async () => {
            const res = await userService.getMyInfo();
            return res.data.data;
        },
        staleTime: 0
    })
}
