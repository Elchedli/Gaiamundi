import { GeoProperty } from 'interfaces/geo-map';
import { useState } from 'react';

interface geoPropertyProps {
  property: GeoProperty[];
}
export const Popover = ({ property }: geoPropertyProps) => {
  const [isVisible, setIsVisible] = useState(false);
  function handleClik() {
    setIsVisible(!isVisible);
  }

  return (
    <>
      <button
        data-popover-target="popover-default"
        data-testid="button"
        type="button"
        onClick={handleClik}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 ml-65 absolute bottom-0 dark:focus:ring-blue-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
          />
        </svg>
      </button>

      {isVisible ? (
        <div
          data-popover
          id="popover-default"
          role="tooltip"
          className="absolute mb-20 z-10 ml-60 -mt-40 inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm  dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
        >
          <div className=" px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              properties
            </h3>
          </div>
          {property.map((element, index) => {
            console.log(element);
            return (
              <div key={index} className="px-3 py-2">
                <p>{element.name}</p>
                <p>
                  {element.isGeoCode
                    ? "c'est un code geo"
                    : "c'est pas un code geo"}
                </p>
                <p>{element.sample}</p>
              </div>
            );
          })}
          <div data-popper-arrow></div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};
