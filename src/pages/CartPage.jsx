import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faMinus, faPlus, faStore, faTicket, faCartArrowDown } from '@fortawesome/free-solid-svg-icons';

// Hooks & Utils
import useProducts from '@/hooks/product/useProducts';
import useFindCartByProfileId from '../hooks/cart/useFindCartByProfileId';
import useRemoveItemFromCart from '../hooks/cart-item/useRemoveCartItemFromCart';
import useUserInfor from "@/hooks/user/useUserInfor";
import { formatCurrency } from '@/components/product-details/sample/FomartProduct';
import Loading from '@/utils/Loading';
import Error from '@/utils/Error';
import { notify } from '../utils/notify';
import ProductList from '@/components/product-list/ProductList';
import useUpdateCartItemQuantity from '../hooks/cart-item/useUpdateQuantityItem';
import ProductImage from '../components/product-list/ProductImageUrl';

export default function CartPage() {
  const navigate = useNavigate();
  const { data: user } = useUserInfor();
  const profileId = user?.userProfile?.profileId;

  // --- Product Recommendations ---
  const [page, setPage] = useState(0);
  const { data, isError: errorList, isLoading: loadingList } = useProducts(page, 5, 'productId', 'asc');
  const productList = data?.data?.data?.content || [];
  const totalPages = data?.data?.data?.totalPages || 1;

  // --- Cart Data ---
  const { data: cart, isError: cartError, isLoading: cartLoading } = useFindCartByProfileId(profileId);
  const cartItems = cart?.items || [];
  // --- State Selection ---
  const [selectItems, setSelectItems] = useState([]);

  // --- Remove Item ---
  const { mutate: removeItem, isLoading: removeLoading } = useRemoveItemFromCart();
  const { mutateAsync: updateQuantityItem } = useUpdateCartItemQuantity();
  // Handle Select Single
  const toggleCheck = (itemId) => {
    setSelectItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const toggleCheckAll = () => {
    const allIds = cartItems.map(item => item.id);
    const isAllChecked = selectItems.length === cartItems.length && cartItems.length > 0;
    setSelectItems(isAllChecked ? [] : allIds);
  };

  // Handle Remove
  const handleRemoveItem = (itemId) => {
    if (!cart?.cartId) return;
    removeItem({ cartId: cart.cartId, cartItemId: itemId }, {
      onSuccess: () => {
        setSelectItems(prev => prev.filter(id => id !== itemId));
      },
      onError: () => notify.error("Xóa thất bại")
    });
  };

  // updateCartItem
  const handleQuantityChange = (cartItemId, quantity, quantityChange) => {
    if (!cart?.cartId) return;
    const cartId = cart.cartId;
    let newQuantity = quantity + quantityChange;
    if (newQuantity < 1) return;

    updateQuantityItem({ cartId, cartItemId, quantity: newQuantity });
  };

  // Handle Buy
  const handleClickBuy = () => {
    if (selectItems.length === 0) {
      notify.info("Vui lòng chọn sản phẩm để mua");
      return;
    }

    navigate('/order', {
      state: {
        mode: "cart",
        profileId: profileId,
        itemIds: selectItems
      }
    });
  };

  // Tính toán tổng tiền
  const totalSelectedPrice = cartItems
    .filter(item => selectItems.includes(item.id))
    .reduce((total, item) => total + (item.price * item.quantity), 0);


  if (cartLoading || loadingList || removeLoading) return <Loading />;
  if (cartError || errorList) return <Error />;

  // --- EMPTY STATE ---
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="bg-white rounded-xl shadow-sm p-12 flex flex-col items-center justify-center text-center">
            <div className="bg-gray-100 p-6 rounded-full mb-4">
              <FontAwesomeIcon icon={faCartArrowDown} className="text-4xl text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Giỏ hàng của bạn còn trống</h2>
            <p className="text-gray-500 mb-6">Hãy lướt dạo và chọn cho mình vài món đồ ưng ý nhé!</p>
            <button onClick={() => navigate('/')} className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition">
              Mua sắm ngay
            </button>
          </div>
          {/* Gợi ý sản phẩm khi giỏ trống */}
          <div className="mt-10">
            <h3 className="text-lg font-bold text-gray-800 mb-4 uppercase">Có thể bạn thích</h3>
            <ProductList products={productList} totalPages={totalPages} page={page} setPage={setPage} />
          </div>
        </div>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-gray-50 pb-32 pt-5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header Title */}
        <div className="flex items-center gap-2 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Giỏ hàng</h1>
          <span className="text-sm font-medium text-gray-500">({cartItems.length} sản phẩm)</span>
        </div>

        {/* HEADER BAR (Desktop) */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-white rounded-xl shadow-sm mb-4 text-sm font-semibold text-gray-600 border border-gray-100">
          <div className="col-span-5 flex items-center gap-3">
            <input
              type="checkbox"
              className="w-4 h-4 accent-red-600 cursor-pointer"
              checked={selectItems.length === cartItems.length && cartItems.length > 0}
              onChange={toggleCheckAll}
            />
            <span>Sản phẩm</span>
          </div>
          <div className="col-span-2 text-center">Đơn giá</div>
          <div className="col-span-2 text-center">Số lượng</div>
          <div className="col-span-2 text-center">Số tiền</div>
          <div className="col-span-1 text-center">Thao tác</div>
        </div>

        {/* LIST ITEMS */}
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 transition hover:shadow-md">
              {/* Shop Name (Optional Header inside card) */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-50">
                <FontAwesomeIcon icon={faStore} className="text-gray-400" />
                <span className="text-sm font-medium text-gray-700">Cửa hàng chính hãng</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">

                {/* Product Info */}
                <div className="col-span-1 md:col-span-5 flex items-start gap-4">
                  <input
                    type="checkbox"
                    className="w-4 h-4 mt-2 accent-red-600 cursor-pointer flex-shrink-0"
                    checked={selectItems.includes(item.id)}
                    onChange={() => toggleCheck(item.id)}
                  />
                  <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                    <ProductImage productId={item?.productId} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium text-gray-800 line-clamp-2 leading-relaxed" title={item.name}>
                      {item.name}
                    </h3>
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-gray-100 text-xs text-gray-500 w-fit">
                      <span>Phân loại: Mặc định</span>
                    </div>
                    <img
                      src="https://down-vn.img.susercontent.com/file/vn-50009109-0098e6c7931f6920155b9e691461474a"
                      alt="Freeship"
                      className="h-4 w-auto mt-1 object-contain"
                    />
                  </div>
                </div>

                {/* Unit Price */}
                <div className="col-span-1 md:col-span-2 text-left md:text-center">
                  <div className="md:hidden text-xs text-gray-400 mb-1">Đơn giá:</div>
                  <span className="font-medium text-gray-700">{formatCurrency(item.price)}</span>
                </div>

                {/* Quantity Stepper */}
                <div className="col-span-1 md:col-span-2 flex items-center justify-start md:justify-center">
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                      disabled={item.quantity <= 1}
                      className="w-8 h-8 flex items-center justify-center bg-white hover:bg-gray-100 text-gray-600 transition disabled:opacity-50"
                    >
                      <FontAwesomeIcon icon={faMinus} size="xs" />
                    </button>
                    <input
                      type="text"
                      value={item.quantity}

                      readOnly
                      className="w-10 h-8 text-center text-sm font-medium text-gray-800 border-x border-gray-300 focus:outline-none"
                    />
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                      className="w-8 h-8 flex items-center justify-center bg-white hover:bg-gray-100 text-gray-600 transition"
                    >
                      <FontAwesomeIcon icon={faPlus} size="xs" />
                    </button>
                  </div>
                </div>

                {/* Total Price */}
                <div className="col-span-1 md:col-span-2 text-left md:text-center">
                  <div className="md:hidden text-xs text-gray-400 mb-1">Thành tiền:</div>
                  <span className="font-bold text-red-600">{formatCurrency(item.price * item.quantity)}</span>
                </div>

                {/* Action */}
                <div className="col-span-1 md:col-span-1 flex justify-end md:justify-center">
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-gray-400 hover:text-red-500 transition p-2 hover:bg-red-50 rounded-full"
                    title="Xóa sản phẩm"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RELATED PRODUCTS */}
        <div className="mt-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-red-600 rounded-full"></div>
            <h3 className="text-xl font-bold text-gray-800">Có thể bạn cũng thích</h3>
          </div>
          <ProductList products={productList} totalPages={totalPages} page={page} setPage={setPage} />
        </div>

      </div>

      {/* STICKY FOOTER CHECKOUT */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 px-4 py-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Left: Select All & Coupon */}
          <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="selectAllFooter"
                className="w-5 h-5 accent-red-600 cursor-pointer"
                checked={selectItems.length === cartItems.length && cartItems.length > 0}
                onChange={toggleCheckAll}
              />
              <label htmlFor="selectAllFooter" className="text-sm font-medium text-gray-700 cursor-pointer select-none">
                Chọn tất cả ({cartItems.length})
              </label>
            </div>
            <button className="hidden sm:flex items-center gap-2 text-red-600 font-medium text-sm hover:text-red-700">
              <FontAwesomeIcon icon={faTicket} />
              Chọn hoặc nhập mã giảm giá
            </button>
          </div>

          {/* Right: Total & Button */}
          <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Tổng thanh toán ({selectItems.length} sản phẩm):</span>
                <span className="text-xl md:text-2xl font-bold text-red-600">
                  {formatCurrency(totalSelectedPrice)}
                </span>
              </div>
              <span className="text-xs text-green-600">Tiết kiệm: {formatCurrency(0)}</span>
            </div>

            <button
              onClick={handleClickBuy}
              className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-red-200 hover:bg-red-700 hover:scale-105 active:scale-95 transition-all w-auto whitespace-nowrap"
            >
              Mua Hàng
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}