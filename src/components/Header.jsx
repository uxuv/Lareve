import React, { useEffect, useState } from "react";
import {
  DeliveryBox02Icon,
  QrCodeIcon,
  Moon02Icon,
  ArrowLeft01Icon,
} from "hugeicons-react";

const logo =
  "https://scontent.fbgw66-3.fna.fbcdn.net/v/t39.30808-6/387832207_294446023378563_4236198012836103185_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=61Y0leeThAIQ7kNvwF_FmfE&_nc_oc=AdmMUmP6Jjy9YhOxh0TgOpVbzqmDzT2cdfm84lIMFEUJvJxoSmDMg1Yiyho0_qFxFcg&_nc_zt=23&_nc_ht=scontent.fbgw66-3.fna&_nc_gid=-i3ihcQXi3wYeaI9EazGeA&oh=00_AfTFljdu1IyNSYoBmcZdGmmDtSmC3crZJ0ncMCzbrb9Dxg&oe=687A03BD";

function Header() {
  const [showproducts, Setshowproducts] = useState(false);

  const now = new Date();
  const hour = now.getHours();
  const isOpen =
    hour >= 16 || hour <= 1 || (hour === 1 && now.getMinutes() <= 30);

  return (
    <>
      <div className="bg-[#0b0615] fixed top-0 left-0 right-0 z-50 flex justify-between items-center border-b border-[#3E3E3E] px-3 py-5 w-screen sm:max-w-[700px] sm:mx-auto ">
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
        <div className="flex items-center gap-3">
          <QrCodeIcon size={24} className="text-white" />
          <div className="w-[1px] h-4 bg-white"></div>
          <DeliveryBox02Icon
            size={24}
            onClick={() => Setshowproducts(true)}
            className="text-white cursor-pointer"
          />
        </div>
      </div>

      {showproducts && (
        <div className="absolute top-0 left-0 z-50 w-full h-full transition-colors duration-500 bg-[#0b0615">
          <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center bg-[#0b0615] border-b border-[#3E3E3E] px-3 py-5 w-screen sm:max-w-[700px] sm:mx-auto">
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
            <div className="flex items-center gap-3">
              <ArrowLeft01Icon
                className="text-white cursor-pointer"
                size={24}
                onClick={() => Setshowproducts(false)}
              />
            </div>
          </div>
          <div className="px-3 py-5 w-screen sm:max-w-[700px] sm:px-0 sm:mx-auto text-black">
            {/* done. only styling */}
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
