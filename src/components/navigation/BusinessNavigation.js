import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  BuildingOfficeIcon,
  CreditCardIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/20/solid";

const tabs = [
  { name: "Account", slug: "account", href: "account", icon: UserIcon },
  {
    name: "Verify Members",
    slug: "verify",
    href: "verify",
    icon: BuildingOfficeIcon,
  },
  { name: "Edit Members", slug: "edit", href: "edit", icon: UsersIcon },
  { name: "Points", slug: "points", href: "points", icon: CreditCardIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const BusinessNavigation = () => {
  //assigning location variable
  const location = useLocation();
  //destructuring pathname from location
  const { pathname } = location;
  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split("/");
  const { id } = useParams();

  console.log(id);

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          // defaultValue={tabs.find((tab) => tab.current).name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                to={tab.href}
                className={classNames(
                  splitLocation[3] === tab.slug
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium"
                )}
                aria-current={
                  splitLocation[3] === tab.slug ? "page" : undefined
                }
              >
                <tab.icon
                  className={classNames(
                    splitLocation[3] === tab.slug
                      ? "text-indigo-500"
                      : "text-gray-400 group-hover:text-gray-500",
                    "-ml-0.5 mr-2 h-5 w-5"
                  )}
                  aria-hidden="true"
                />
                <span>{tab.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default BusinessNavigation;
