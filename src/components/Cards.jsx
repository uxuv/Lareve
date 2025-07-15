import React, { useState, useEffect } from "react";
import {
  DeliveryBox02Icon,
  Invoice02Icon,
  ArrowLeft01Icon,
} from "hugeicons-react";

const logo =
  "https://scontent.fbgw66-3.fna.fbcdn.net/v/t39.30808-6/387832207_294446023378563_4236198012836103185_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=61Y0leeThAIQ7kNvwF_FmfE&_nc_oc=AdmMUmP6Jjy9YhOxh0TgOpVbzqmDzT2cdfm84lIMFEUJvJxoSmDMg1Yiyho0_qFxFcg&_nc_zt=23&_nc_ht=scontent.fbgw66-3.fna&_nc_gid=-i3ihcQXi3wYeaI9EazGeA&oh=00_AfTFljdu1IyNSYoBmcZdGmmDtSmC3crZJ0ncMCzbrb9Dxg&oe=687A03BD";

const photo = "https://via.placeholder.com/400x300?text=Food+Item";
const data = {
  الشاورما: [
    { id: 1, name: "شاورما لحم", price: 1500, photo },
    { id: 2, name: "شاورما دجاج", price: 250, photo },
  ],
  البيتزا: [
    { id: 3, name: "بيتزا مارجريتا", price: 2000, photo },
    { id: 4, name: "بيتزا خضار", price: 1800, photo },
  ],
  البرجر: [
    { id: 5, name: "برجر لحم", price: 1700, photo },
    { id: 6, name: "برجر دجاج", price: 1600, photo },
  ],
  السناكات: [
    { id: 7, name: "فاهيتا", price: 1700, photo },
    { id: 8, name: "مكسيكي", price: 1600, photo },
  ],
  البوكسات: [
    { id: 9, name: "بوكس سناك", price: 1700, photo },
    { id: 10, name: "بوكس حكاية", price: 1600, photo },
    { id: 11, name: "بوكس الخيال", price: 1600, photo },
    { id: 12, name: "بوكس النجمة", price: 1600, photo },
  ],
  الريزو: [
    { id: 13, name: "ريزو كلاسك", price: 1700, photo },
    { id: 14, name: "ريزو مدخن", price: 1600, photo },
    { id: 15, name: "ريزو سبايسي", price: 1600, photo },
    { id: 16, name: "ريزو جبن", price: 1600, photo },
    { id: 17, name: "ريزو لحم", price: 1600, photo },
    { id: 18, name: "ريزو دجاج", price: 1600, photo },
  ],
  الكرسبي: [
    { id: 19, name: "كرسبي 5 قطع", price: 1700, photo },
    { id: 20, name: "كرسبي 10 قطع", price: 1600, photo },
    { id: 21, name: "كرسبي 15 قطعة", price: 1600, photo },
    { id: 22, name: "كرسبي 20 قطعة", price: 1600, photo },
  ],
  الكنتاكي: [
    { id: 23, name: "كنتاكي 5 قطع", price: 1700, photo },
    { id: 24, name: "كنتاكي 10 قطع", price: 1600, photo },
    { id: 25, name: "كنتاكي 15 قطعة", price: 1600, photo },
    { id: 26, name: "كنتاكي 20 قطعة", price: 1600, photo },
  ],
  الاجنحة: [
    { id: 27, name: "اجنحة 5 قطع", price: 1700, photo },
    { id: 28, name: "اجنحة 10 قطع", price: 1600, photo },
    { id: 29, name: "اجنحة 15 قطعة", price: 1600, photo },
    { id: 30, name: "اجنحة 20 قطعة", price: 1600, photo },
  ],
};
const categories = ["الكل", ...Object.keys(data)];

function formatPrice(price) {
  if (price < 1000) {
    return `${price} د.ع`;
  } else {
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} د.ع`;
  }
}

function Header({ cartCount, onOpenFullCart }) {
  const now = new Date();
  const hour = now.getHours();
  const isOpen =
    hour >= 16 || hour <= 1 || (hour === 1 && now.getMinutes() <= 30);

  return (
    <div className="bg-[#0b0615] fixed top-0 left-0 right-0 z-50 flex justify-between items-center border-b border-[#3E3E3E] px-3 py-5 w-screen sm:max-w-[700px] sm:mx-auto">
      <div className="flex items-center gap-2">
        <a href="#">
          <img className="rounded-lg w-14 h-14" src={logo} alt="logo" />
        </a>
        <div className="flex flex-col">
          <h1 className="font-medium text-white">مطعم وكافيه لاريف</h1>
          <h1
            className={`-mt-1 flex items-center gap-1 ${
              isOpen ? "text-[#15FF00]" : "text-red-500"
            }`}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full ${
                isOpen ? "bg-[#15FF00]" : "bg-red-500"
              }`}
            ></div>
            {isOpen ? "المطعم مفتوح" : "المطعم مغلق"}
          </h1>
        </div>
      </div>
      <div
        className="relative flex items-center gap-3 cursor-pointer"
        onClick={onOpenFullCart}
      >
        <DeliveryBox02Icon size={24} className="text-white" />
        {cartCount > 0 && (
          <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-2 -right-2">
            {cartCount}
          </span>
        )}
      </div>
    </div>
  );
}

function Menu({ cart, setCart }) {
  const [selectedCategory, setSelectedCategory] = useState("الكل");

  const filteredProducts =
    selectedCategory === "الكل"
      ? Object.values(data).flat()
      : data[selectedCategory] || [];

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    localStorage.setItem(
      "cart",
      JSON.stringify(
        existingItem
          ? cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...cart, { ...product, quantity: 1 }]
      )
    );
  };

  return (
    <div className="bg-[#0B0615] min-h-screen pt-4">
      <div className="bg-[#0B0615] px-4 ">
        <ul className="flex gap-2 pb-3 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <li
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex-shrink-0 cursor-pointer rounded-md px-4 py-2 transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-purple-700 text-white shadow-lg"
                  : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-2 gap-3 px-3 mt-4">
        {filteredProducts.length === 0 && (
          <p className="col-span-2 text-white">لا توجد منتجات في هذا القسم</p>
        )}
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="w-full p-3 rounded-3xl bg-[#191129] text-white hover:bg-[#221239] transition-colors duration-300 flex flex-col"
          >
            <img
              src={product.photo}
              alt={product.name}
              className="object-cover w-full h-40 rounded-md"
            />
            <h3 className="mt-3 font-bold">{product.name}</h3>
            <p className="mt-1 text-sm text-gray-300 ">
              {formatPrice(product.price)}
            </p>
            <button
              onClick={() => addToCart(product)}
              className="mt-6 text-sm w-full bg-[#420080] rounded-lg py-3 text-white font-semibold hover:bg-[#520090] transition-colors cursor-pointer"
            >
              إضافة إلى السلة
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function FullCart({ cart, setCart, onClose }) {
  const now = new Date();
  const hour = now.getHours();
  const isOpen =
    hour >= 16 || hour <= 1 || (hour === 1 && now.getMinutes() <= 30);

  const getTotalPrice = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const [editingItem, setEditingItem] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleQuantityClick = (item) => {
    setEditingItem(item.id);
    setEditValue(item.quantity.toString());
  };

  const handleQuantityChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleQuantityBlur = (itemId) => {
    const newQuantity = parseInt(editValue) || 0;
    if (newQuantity <= 0) {
      const newCart = cart.filter((item) => item.id !== itemId);
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      const newCart = cart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
    setEditingItem(null);
  };

  const handleKeyPress = (e, itemId) => {
    if (e.key === "Enter") {
      handleQuantityBlur(itemId);
    }
  };

  function getCartLabel(cart) {
    const uniqueItemsCount = cart.length;
    if (uniqueItemsCount === 1) return "عنصر واحد";
    if (uniqueItemsCount === 2) return "عنصران";
    if (uniqueItemsCount >= 3 && uniqueItemsCount <= 10)
      return `${uniqueItemsCount} عناصر`;
    return `${uniqueItemsCount} عنصر`;
  }

  const sendOrderToWhatsApp = () => {
    const phoneNumber = "+96407744881167";
    let message = "الطلب:\n\n";

    cart.forEach((item) => {
      message += `${item.name} ${item.quantity}\n`;
    });

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[#0b0615] z-50 overflow-hidden">
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center bg-[#0b0615] border-b border-[#3E3E3E] pr-3 py-5 w-screen sm:max-w-[700px] sm:mx-auto">
        <div className="flex items-center gap-2">
          <a href="">
            <img className="rounded-lg w-14 h-14" src={logo} alt="logo" />
          </a>
          <div className="flex flex-col">
            <h1 className="font-medium text-white">مطعم وكافيه لاريف</h1>
            <h1
              className={`-mt-1 flex items-center gap-1 ${
                isOpen ? "text-[#15FF00]" : "text-red-500"
              }`}
            >
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  isOpen ? "bg-[#15FF00]" : "bg-red-500"
                }`}
              ></div>
              {isOpen ? "المطعم مفتوح" : "المطعم مغلق"}
            </h1>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 text-2xl text-white cursor-pointer"
        >
          <ArrowLeft01Icon size={28} className="ml-1" />
        </button>
      </div>

      <div className="pt-24 px-4 sm:max-w-[700px] sm:mx-auto overflow-y-auto h-[calc(100vh-96px)] pb-24">
        {cart.length === 0 ? (
          <div className="flex items-center justify-center w-full h-full ">
            <p className="text-white ">السلة فارغة</p>
          </div>
        ) : (
          <>
            <h2 className="mt-6 text-xl font-semibold text-white">
              طلبك الحالي
            </h2>
            <h1 className="mt-1 text-base text-white/50">
              {getCartLabel(cart)}
            </h1>

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2 px-4 py-4 mt-6 text-white border border-gray-600 border-solid rounded-2xl"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.photo}
                    alt={item.name}
                    className="object-cover w-16 h-16 rounded-md"
                  />
                  <div>
                    <h3 className="text-lg font-bold">{item.name}</h3>
                    <p className="text-gray-400">{formatPrice(item.price)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  {editingItem === item.id ? (
                    <div className="flex items-center border border-gray-800 border-solid rounded-md">
                      <span
                        className="px-2 py-1 text-lg text-white cursor-pointer"
                        onClick={() => {
                          const newValue = parseInt(editValue) - 1;
                          setEditValue(Math.max(1, newValue).toString());
                        }}
                      >
                        -
                      </span>
                      <input
                        type="number"
                        value={editValue}
                        onChange={handleQuantityChange}
                        onBlur={() => handleQuantityBlur(item.id)}
                        onKeyPress={(e) => handleKeyPress(e, item.id)}
                        className="w-12 px-1 py-1 text-center text-white bg-[#0b0615] border-none focus:ring-0 focus:outline-none"
                        autoFocus
                        min="1"
                        style={{
                          WebkitAppearance: "none",
                          MozAppearance: "textfield",
                        }}
                      />
                      <span
                        className="px-2 py-1 text-lg text-white cursor-pointer"
                        onClick={() => {
                          const newValue = parseInt(editValue) + 1;
                          setEditValue(newValue.toString());
                        }}
                      >
                        +
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center border border-gray-800 border-solid rounded-md">
                      <span
                        className="px-2 py-1 text-lg text-white cursor-pointer"
                        onClick={() => {
                          const newQuantity = item.quantity - 1;
                          const newCart =
                            newQuantity <= 0
                              ? cart.filter((i) => i.id !== item.id)
                              : cart.map((i) =>
                                  i.id === item.id
                                    ? { ...i, quantity: newQuantity }
                                    : i
                                );
                          setCart(newCart);
                          localStorage.setItem("cart", JSON.stringify(newCart));
                        }}
                      >
                        -
                      </span>
                      <span
                        className="px-3 py-1 text-white bg-[#0b0615] cursor-pointer"
                        onClick={() => handleQuantityClick(item)}
                      >
                        {item.quantity}
                      </span>
                      <span
                        className="px-2 py-1 text-lg text-white cursor-pointer"
                        onClick={() => {
                          const newCart = cart.map((i) =>
                            i.id === item.id
                              ? { ...i, quantity: i.quantity + 1 }
                              : i
                          );
                          setCart(newCart);
                          localStorage.setItem("cart", JSON.stringify(newCart));
                        }}
                      >
                        +
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div
              className="fixed bottom-0 left-1/2 transform -translate-x-1/2 py-5 rounded-2xl bg-[#420080] flex items-center justify-between px-5 mb-12"
              style={{
                boxShadow: "inset 0 4px 4px rgba(255, 255, 255, 0.4)",
                width: "calc(100% - 32px)",
                maxWidth: "700px",
              }}
            >
              <div className="flex flex-col">
                <div className="flex text-base gap-1.5 items-center text-white">
                  <Invoice02Icon size={18} />
                  المجموع
                </div>
                <div>
                  <h1 className="mt-1 text-lg font-bold text-white">
                    {formatPrice(getTotalPrice())}
                  </h1>
                </div>
              </div>
              <div>
                <button
                  onClick={sendOrderToWhatsApp}
                  className="text-[#420080] bg-white rounded-md py-3 px-5 font-medium cursor-pointer"
                >
                  ارسال الطلب
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [showFullCart, setShowFullCart] = useState(() => {
    return window.location.hash === "#cart";
  });

  useEffect(() => {
    if (showFullCart) {
      document.body.style.overflow = "hidden";
      window.location.hash = "cart";
    } else {
      document.body.style.overflow = "auto";
      window.location.hash = "";
    }
  }, [showFullCart]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const getUniqueItemsCount = () => cart.length;

  return (
    <>
      <Header
        cartCount={getUniqueItemsCount()}
        onOpenFullCart={() => setShowFullCart(true)}
      />
      <Menu cart={cart} setCart={setCart} />
      {showFullCart && (
        <FullCart
          cart={cart}
          setCart={setCart}
          onClose={() => setShowFullCart(false)}
        />
      )}
    </>
  );
}
