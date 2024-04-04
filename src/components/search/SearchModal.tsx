import React from "react";
import { Buttons, FilterData } from "../../app/models";

interface Props {
  arrayButtons: Buttons[];
  filterData: FilterData;
  setFilterData: React.Dispatch<React.SetStateAction<FilterData>>;
  filterButtons: FilterData;
  setFilterButtons: React.Dispatch<React.SetStateAction<FilterData>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchModal = ({
  arrayButtons,
  filterData,
  setFilterData,
  filterButtons,
  setFilterButtons,
  setShowModal,
}: Props) => {
  const conditions = () => {
    return (
      filterData.character !== filterButtons.character ||
      filterData.status !== filterButtons.status ||
      filterData.specie !== filterButtons.specie ||
      filterData.gender !== filterButtons.gender
    );
  };

  return (
    <div className="w-screen  h-screen md:w-full md:h-full mt-4 rounded-lg shadow-lg bg-white">
      <div className=" flex justify-center">
        <div className="p-5">
          {arrayButtons.map((item, index: number) => (
            <div>
              <p
                className={`${
                  index === 0 ? "mb-2" : "pt-5 pb-2"
                } text-sm text-gray-500 font-normal`}
              >
                {item.text}
              </p>
              <div className="flex gap-x-4">
                {item.buttons.map((button) => (
                  <button
                    className={`w-24 hover:bg-purple-100 font-semi-bold py-2 px-4 rounded-lg border border-gray-300 size-buttons ${
                      button.value === filterData[item.name]
                        ? "bg-purple-100"
                        : ""
                    }`}
                    onClick={() => {
                      setFilterData({
                        ...filterData,
                        [item.name]: button.value,
                      });
                    }}
                  >
                    {button.text}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className={`${
            !conditions()
              ? "text-gray-500 bg-gray-200"
              : "bg-purple-600 hover:bg-purple-700 text-white"
          } font-semi-bold py-2 px-4 rounded-lg mt-5 mb-5`}
          style={{ width: "85%" }}
          onClick={() => {
            setFilterButtons({
              character: filterData.character,
              status: filterData.status,
              specie: filterData.specie,
              gender: filterData.gender,
            });
            setShowModal(false);
          }}
          disabled={!conditions()}
        >
          Filter
        </button>
      </div>
    </div>
  );
};