import { useMutation, useQueryClient } from '@tanstack/react-query'
import addressService from "@/services/addressService"
import { notify } from '../../utils/notify';

export default function useCreateAddress() {
    const queryClient = useQueryClient();

    return useMutation(
        {
            mutationKey: ["create-address"],
            mutationFn: (payload) => addressService.createAddress(payload),
            onSuccess: () => {
                queryClient.invalidateQueries(["address"])
                notify.success("Thêm địa chỉ mới thành công")
            },
            onError: (err) => {
                console.error("Lỗi khi tạo địa chỉ mới ", err);
                notify.error("Thêm địa chỉ mới không thành công !")
            }
        }
    )
}
