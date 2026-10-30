import React from 'react'
import { useNavigate } from 'react-router-dom'
import useOrderStore from '../../stores/useOrderStore';

export default function useExitOrder() {
    const navigate = useNavigate();
    const clearOrderCache = useOrderStore((s) => s.clearOrder);

    const exitOrder = (path ="/") => {
        clearOrderCache();
        navigate(path);
    }

    return { exitOrder };
}
