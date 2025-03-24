/* eslint-disable @next/next/no-img-element */
import React from "react";
import Select, { MultiValue, StylesConfig, components } from "react-select";
import { X } from "lucide-react";
import { IBoardMember } from "@/interface/boardInterface";

type Props = {
  members?: IBoardMember[];
  handleChange: (
    selected: MultiValue<{
      value: string;
      label: React.ReactNode;
      data: IBoardMember;
    }>
  ) => void;
  value?:
    | MultiValue<{
        value: string;
        label: React.ReactNode;
        data: IBoardMember;
      }>
    | unknown;
};

const MultiValueRemove = (props: any) => {
  return (
    <components.MultiValueRemove {...props}>
      <X className="h-3 w-3 cursor-pointer hover:text-gray-300 transition-colors" />
    </components.MultiValueRemove>
  );
};

export default function AssigneesSelect({
  members,
  handleChange,
  value,
}: Props) {
  const options = members?.map((member) => ({
    value: member.name,
    label: (
      <div className="flex items-center gap-2">
        <img
          src={member.profileImg}
          alt={member.name}
          width={20}
          height={20}
          className="rounded-full"
        />
        {member.name}
      </div>
    ),
    data: member,
  }));

  const customStyles: StylesConfig = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#2d2f33",
      border: "none",
      minHeight: "38px",
      display: "flex",
      alignItems: "center",
      padding: "0 8px",
      boxShadow: "none",
      "&:hover": { borderColor: "#5865f2" },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#2f3136",
      borderColor: "#202225",
      borderRadius: "4px",
      overflow: "hidden",
      zIndex: 9999,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#393c43" : "#2f3136",
      color: "white",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#393c43",
      },
      padding: "8px 12px",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#4f545c",
      borderRadius: "3px",
      margin: "2px",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "white",
      fontSize: "0.8rem",
      padding: "3px 6px 3px 3px",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#b9bbbe",
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        color: "white",
      },
      padding: "0 4px",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#72767d",
    }),
    input: (provided) => ({
      ...provided,
      color: "white",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor: "gray",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#8e9297",
      "&:hover": {
        color: "white",
      },
      padding: "4px", // Ensures proper spacing
      svg: {
        width: "16px", // Same as h-4
        height: "16px", // Same as w-4
      },
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: "#b9bbbe",
      "&:hover": {
        color: "white",
      },
    }),
    noOptionsMessage: (provided) => ({
      ...provided,
      color: "#b9bbbe",
      backgroundColor: "#2f3136",
      textAlign: "center",
    }),
  };

  return (
    <Select
      isMulti
      options={options}
      onChange={(newValue) =>
        handleChange(
          newValue as MultiValue<{
            value: string;
            label: React.ReactNode;
            data: IBoardMember;
          }>
        )
      }
      value={value}
      styles={customStyles}
      components={{ MultiValueRemove }}
      placeholder="Add assignee"
      noOptionsMessage={() => "No more members available"}
      classNamePrefix="react-select"
    />
  );
}
