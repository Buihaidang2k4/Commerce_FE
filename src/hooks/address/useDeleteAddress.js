import { useMutation, useQueryClient } from '@tanstack/react-query'
import addressService from '@/services/addressService'
import { notify } from '@/utils/notify'

export default function useDeleteAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({profileId,addressId}) =>
      addressService.deleteAddress({ profileId, addressId }),

    onSuccess: () => {
      notify.success('Address deleted successfully');
      queryClient.invalidateQueries(['address']);
    },

    onError: (error) => {
      notify.error(
        error?.response?.data?.message || 'Error deleting address'
      );
    },
  });
}
