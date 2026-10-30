import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { PAYMENT_METHODS } from '../components/OrderPage/PaymentMethod'

const useOrderStore = create(
    persist(
        (set) => ({
            orderNote: '',
            selectedVoucher: null,
            selectedAddress: null,
            selectedPayment: PAYMENT_METHODS.CASH.value,

            setOrderNote: (note) => set({ orderNote: note }),
            setSelectedVoucher: (voucher) => set({ selectedVoucher: voucher }),
            setSelectedAddress: (address) => set({ selectedAddress: address }),
            setSelectedPayment: (payment) => set({ selectedPayment: payment }),

            clearOrder: () => {
                set({
                    selectedVoucher: null,
                    selectedAddress: null,
                    selectedPayment: PAYMENT_METHODS.CASH.value,
                    orderNote: '',
                })
            }
        }),
        {
            name: 'order-storage',
            version: 1,
        }
    )
)

export default useOrderStore;

