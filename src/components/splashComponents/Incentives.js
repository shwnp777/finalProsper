import React from "react";

const Incentives = () => {
  const incentives = [
    {
      name: "Any Location",
      description:
        "WeProsper is available in any location. Anywhere in the world.",
      imageSrc:
        "https://tailwindui.com/img/ecommerce/icons/icon-delivery-light.svg",
    },
    {
      name: "24/7 Customer Support",
      description:
        "Our AI chat widget is powered by a naive series of if/else statements. Guaranteed to irritate.",
      imageSrc:
        "https://tailwindui.com/img/ecommerce/icons/icon-chat-light.svg",
    },
    {
      name: "Shopping Experience",
      description:
        "Look how fast that cart is going. What does this mean for the actual experience? I don't know.",
      imageSrc:
        "https://tailwindui.com/img/ecommerce/icons/icon-fast-checkout-light.svg",
    },
  ];

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl py-24 sm:px-2 sm:py-32 lg:px-4">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-10 gap-x-8 px-4 lg:max-w-none lg:grid-cols-3">
          {incentives.map((incentive) => (
            <div
              key={incentive.name}
              className="text-center sm:flex sm:text-left lg:block lg:text-center"
            >
              <div className="sm:flex-shrink-0">
                <div className="flow-root">
                  <img
                    className="mx-auto h-24 w-28"
                    src={incentive.imageSrc}
                    alt=""
                  />
                </div>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3 lg:mt-3 lg:ml-0">
                <h3 className="text-sm font-medium text-gray-900">
                  {incentive.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {incentive.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Incentives;
