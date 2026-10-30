import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import addressService from "@/services/addressService.js"
import { notify } from '../../utils/notify';

export default function useUpdateAddress() {
    const queryClient = useQueryClient();

    return useMutation(
        {
            mutationKey: ["update-address"],
            mutationFn: (payload) => addressService.updateAddress(payload),

            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["address"] });
                notify.success("Cập nhật địa chỉ thành công ");
            }
            , onError: (err) => {
                notify.error("Cập nhật địa chỉ không thành công ! ")
                console.error("Cập nhật địa chỉ  lỗi ! ", err)
            }
        }
    )
}
