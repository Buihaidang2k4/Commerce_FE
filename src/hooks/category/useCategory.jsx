import { useState, useEffect } from 'react';
import categoryService from '@/services/categoryService';

export default function useCategory() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        categoryService.getAllCategories()
            .then(res => {
                setCategories(res.data.data || []);
            }).catch((err) => {
                console.log("Error get all categories: ", err)
                setError(err);
            }).finally(() => {
                setLoading(false);
            })
    },[])


    return  { categories, loading, error };
}
