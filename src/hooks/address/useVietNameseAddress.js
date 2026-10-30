// hooks/useVietnamAddress.js
import { useEffect, useState } from "react";
import axios from "axios";

export default function useVietnamAddress(initialAddress) {
    const [data, setData] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    // load data hành chính
    useEffect(() => {
        axios
            .get("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json")
            .then(res => setData(res.data));
    }, []);

    // xử lý khi UPDATE
    useEffect(() => {
        if (!initialAddress || data.length === 0) return;

        const province = data.find(p => p.Name === initialAddress.province);
        if (!province) return;

        setDistricts(province.Districts);

        const district = province.Districts.find(
            d => d.Name === initialAddress.district
        );
        if (!district) return;

        setWards(district.Wards);
    }, [initialAddress, data]);

    const handleProvinceChange = (provinceName, setFormData) => {
        const province = data.find(p => p.Name === provinceName);
        if (!province) return;

        setDistricts(province.Districts);
        setWards([]);

        setFormData(prev => ({
            ...prev,
            province: provinceName,
            district: "",
            ward: ""
        }));
    };

    const handleDistrictChange = (districtName, setFormData) => {
        const district = districts.find(d => d.Name === districtName);
        if (!district) return;

        setWards(district.Wards);

        setFormData(prev => ({
            ...prev,
            district: districtName,
            ward: ""
        }));
    };

    const handleWardChange = (wardName, setFormData) => {
        setFormData(prev => ({
            ...prev,
            ward: wardName
        }));
    };

    return {
        provinces: data,
        districts,
        wards,
        handleProvinceChange,
        handleDistrictChange,
        handleWardChange
    };
}
