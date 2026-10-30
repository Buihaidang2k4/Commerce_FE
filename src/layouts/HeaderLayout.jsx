import { useEffect, useRef, useState } from "react"
import logo from "@/assets/image/mylogo.png"
import { Link } from "react-router-dom"
import useAuthStore from "@/stores/useAuthStore.jsx"
import useLogout from "@/hooks/auth/useLogout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ConfirmDialog from "@/utils/ConfirmDialog.jsx"
import useHeaderAuth from "../hooks/header/useHeaderAuth"
import { faFilter } from "@fortawesome/free-solid-svg-icons"
import FormSearchFilter from "../components/Header/FormSearchFilter"
import useExitOrder from "../hooks/order/useExitOrder"

const buildQueryString = (params) => {
    const query = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
            query.append(key, value);
        }
    });

    return query.toString().replace(/\+/g, "%20");
}



export default function Header() {
    const { exitOrder } = useExitOrder();
    const { isLoggedIn, navigate, requireLogin } = useHeaderAuth()
    const user = useAuthStore(state => state.user)
    const { logout } = useLogout()
    const [showProfileMenu, setShowProfileMenu] = useState(false)
    const [showDialog, setShowDialog] = useState(false)
    const menuRef = useRef(null)
    const [showFilter, setShowFilter] = useState(false);
    const filterRef = useRef(null);
    const [keywordInput, setKeywordInput] = useState("");

    const [paramsSearch, setParamSearch] = useState({
        keyword: null,
        categoryName: null,
        minPrice: null,
        maxPrice: null,
        hasDiscount: false,
        bestSeller: null,
        rating: null,
        origin: null,
        page: 0,
        size: 20,
        sort: ["createAt,desc"],
    })

    const handleProfileClick = () => {
        const ok = requireLogin(() => setShowProfileMenu(v => !v))
        if (!ok) setShowDialog(true)
    }

    const handleCartClick = () => {
        const ok = requireLogin(() => exitOrder("/shop-cart"));
        if (!ok) setShowDialog(true)
    }

    const handleLogoClick = () => {
        exitOrder(isLoggedIn ? "/home-private" : "/")
    }

    // close profile khi click bên ngoài
    useEffect(() => {
        const hanldeClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) setShowProfileMenu(false)
        }
        document.addEventListener("mousedown", hanldeClickOutside)
        return () => document.removeEventListener("mousedown", hanldeClickOutside)
    }, [])

    useEffect(() => {
        if (!showFilter) return;

        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setShowFilter(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showFilter]);


    const performSearch = () => {
        const trimmed = keywordInput.trim();
        if (!trimmed) return;

        const queryParams = {
            ...paramsSearch,
            keyword: trimmed,
            page: 0,
        };

        const queryString = buildQueryString(queryParams);
        exitOrder(`/search-product?${queryString}`);
    };

    // Trong JSX:
    <input
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        value={keywordInput}
        onChange={(e) => setKeywordInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && performSearch()}
        className="..."
    />

    return (
        <header className="w-full bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-99 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3 cursor-pointer group" onClick={handleLogoClick}>
                    <div className="relative">
                        <img
                            src={logo || "/placeholder.svg"}
                            alt="MyShop Logo"
                            className="h-11 w-auto rounded-lg shadow-sm transition-transform group-hover:scale-105"
                        />
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-white"></span>
                        </span>
                    </div>
                    <h1 className="text-xl font-bold hidden sm:block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        MYSHOPAPI
                    </h1>
                </div>

                {/* search */}
                <div className="flex flex-1 max-w-lg items-center relative group" >
                    {/* Search Icon */}
                    <div className="absolute left-3 text-gray-400 pointer-events-none">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    {/* Input Search*/}
                    <input
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        value={keywordInput}
                        onChange={(e) => setKeywordInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && performSearch()}
                        className="w-full pl-10 pr-14 py-3 rounded-full border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm transition-all duration-300"
                    />

                    {/* Badge HOT */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 hidden sm:block">
                        <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-full shadow-md">
                            HOT
                        </span>
                    </div>

                    {/* Filter Button */}
                    <button
                        onClick={() => setShowFilter(!showFilter)}
                        className="absolute right-2 flex items-center gap-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md hover:shadow-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
                    >
                        <FontAwesomeIcon icon={faFilter} className="text-xs" />
                        Lọc
                    </button>


                    {showFilter &&
                        <>
                            <div ref={filterRef}>
                                <FormSearchFilter
                                    onApply={(filters) => {
                                        const query = buildQueryString({
                                            ...filters,
                                            keyword: keywordInput || paramsSearch.keyword,
                                            page: paramsSearch.page,
                                            size: paramsSearch.size,
                                            sort: paramsSearch.sort,
                                        })

                                        setShowFilter(false)
                                        exitOrder(`/search-product?${query}`)
                                    }}
                                />
                            </div>
                        </>
                    }
                </div>

                <div className="flex items-center gap-5 relative">
                    <div className="relative cursor-pointer group">
                        <div className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-6 w-6 text-gray-700 group-hover:text-blue-600 transition-colors"
                            >
                                <path d="M5.85 3.5a.75.75 0 0 0-1.117-1 9.719 9.719 0 0 0-2.348 4.876.75.75 0 0 0 1.479.248A8.219 8.219 0 0 1 5.85 3.5ZM19.267 2.5a.75.75 0 1 0-1.118 1 8.22 8.22 0 0 1 1.987 4.124.75.75 0 0 0 1.48-.248A9.72 9.72 0 0 0 19.266 2.5Z" />
                                <path
                                    fillRule="evenodd"
                                    d="M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 0 4.83-1.244.75.75 0 0 0 .298-1.205 8.217 8.217 0 0 1-2.118-5.52V9A6.75 6.75 0 0 0 12 2.25ZM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 0 0 4.496 0l.002.1a2.25 2.25 0 1 1-4.5 0Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <span className="absolute top-0 right-0 bg-gradient-to-br from-red-500 to-pink-600 text-white text-[10px] font-semibold rounded-full min-w-[18px] h-[18px] flex items-center justify-center shadow-md animate-pulse">
                            5
                        </span>
                    </div>

                    <div className="relative cursor-pointer group hidden sm:block">
                        <div className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-6 w-6 text-gray-700 group-hover:text-red-500 transition-colors"
                            >
                                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                            </svg>
                        </div>
                        <span className="absolute top-0 right-0 bg-gradient-to-br from-pink-500 to-rose-600 text-white text-[10px] font-semibold rounded-full min-w-[18px] h-[18px] flex items-center justify-center shadow-md">
                            12
                        </span>
                    </div>

                    {/* Cart */}
                    <div className="relative cursor-pointer group" onClick={handleCartClick}>
                        <div className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 25 25"
                                fill="currentColor"
                                className="h-6 w-6 text-gray-700 group-hover:text-blue-600 transition-colors"
                            >
                                <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                            </svg>
                        </div>
                        <span className="absolute top-0 right-0 bg-gradient-to-br from-red-500 to-pink-600 text-white text-[10px] font-semibold rounded-full min-w-[18px] h-[18px] flex items-center justify-center shadow-md">
                            3
                        </span>
                    </div>

                    {/* Profile */}
                    <div className="relative" ref={menuRef}>
                        <div
                            className="h-9 w-9 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg hover:scale-105 transition-all ring-2 ring-offset-2 ring-blue-200"
                            onClick={handleProfileClick}
                        >
                            <FontAwesomeIcon icon={["fas", "user"]} className="text-sm" />
                        </div>

                        <ConfirmDialog
                            isOpen={showDialog}
                            onClose={() => setShowDialog(false)}
                            onConfirm={() => navigate("/login")}
                            title="Chưa đăng nhập"
                            message="Bạn cần đăng nhập để truy cập profile. Bạn có muốn đi tới trang đăng nhập không?"
                            confirmText="Đăng nhập"
                            cancelText="Hủy"
                        />

                        {showProfileMenu && isLoggedIn && (
                            <div className="absolute right-0 mt-2 w-60 bg-white shadow-2xl rounded-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500"></div>

                                {/* Header user info */}
                                <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-gray-100">
                                    <p className="font-semibold text-gray-900 truncate text-sm">{user?.email || "Người dùng"}</p>
                                    <p className="text-xs text-gray-600 mt-0.5">Thành viên MYSHOP</p>
                                    <div className="mt-2">
                                        <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-400 to-yellow-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                className="w-3 h-3"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            VIP
                                        </span>
                                    </div>
                                </div>

                                {/* Menu items */}
                                <div className="py-1.5">
                                    <Link
                                        to="/manager"
                                        onClick={() => exitOrder("/manager")}
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                    >
                                        <i className="fa-solid fa-gear w-5 text-gray-400" />
                                        <span className="font-medium">Quản lý tài khoản</span>
                                    </Link>

                                    <button
                                        onClick={logout}
                                        className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                                    >
                                        <i className="fa-solid fa-right-from-bracket w-5 text-gray-400" />
                                        <span className="font-medium">Đăng xuất</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}
