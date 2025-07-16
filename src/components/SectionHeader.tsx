import React from "react";

interface SectionHeaderProps {
  title: string;
  number: number;
  subtitle: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = (props) => {
  return (
    <div>
      <div className="flex flex-row  gap-2 mb-6">
        <div className="w-10 h-10 rounded-full border-orange-500 border-2 text-orange-500 flex items-center justify-center text-xl font-bold">
          {props.number}
        </div>
        <div>
          <h2 className="text-xl font-medium">{props.title}</h2>
          <p className="text-left">{props.subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default SectionHeader;
