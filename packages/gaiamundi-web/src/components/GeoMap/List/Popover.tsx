import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { GeoProperty } from 'interfaces/geo-map';
import { useState } from 'react';
interface GeoPropertyProps {
  properties: GeoProperty[];
}
export const Popover: React.FC<GeoPropertyProps> = ({ properties }) => {
  const [isVisible, setIsVisible] = useState(false);
  function handleClick() {
    setIsVisible(!isVisible);
  }

  return (
    <>
      <button
        data-popover-target="popover-default"
        data-testid="button"
        type="button"
        onClick={handleClick}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 ml-65 absolute bottom-0 dark:focus:ring-blue-800"
      >
        <InformationCircleIcon width={24} height={24} />
      </button>

      {isVisible ? (
        <div
          id="popover-default"
          role="tooltip"
          className="absolute mb-20 z-10 ml-60 -mt-40 inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm  dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
        >
          <div className=" px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              properties
            </h3>
          </div>
          {properties.map((element) => {
            return (
              <>
                <table>
                  <tr>
                    <td>Nom</td>
                    <td>Echantillon</td>
                    <td>Géocode</td>
                  </tr>
                  <tr>
                    <td>
                      <p>{element.name}</p>
                    </td>
                    <td>
                      <p>
                        {element.isGeoCode
                          ? 'Code Géographie'
                          : 'Ce code ne correspond pas à la géographie'}
                      </p>
                    </td>
                    <td>
                      <p>{element.sample}</p>
                    </td>
                  </tr>
                </table>
              </>
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
