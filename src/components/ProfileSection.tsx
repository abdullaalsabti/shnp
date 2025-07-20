import React from "react";

type ProfileSectionProps = {
  imgUrl: string;
  name: string;
};

const ProfileSection: React.FC<ProfileSectionProps> = ({ imgUrl, name }) => {
  return (
    <div className="flex flex-row justify-between items-center gap-3">
      <div className="w-12 h-12 rounded-full overflow-hidden">
        <img
          src={imgUrl}
          alt="profile avatar"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-evenly items-center">
        <h3 className="font-bold">{name}</h3>
        <p className="text-gray-500 text-sm">???????</p>
      </div>
    </div>
  );
};

export default ProfileSection;
