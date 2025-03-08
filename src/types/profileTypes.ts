export type   Profile = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  profileId:string,
  setProfileId: (id:string)=>void
};

export type UpdateProfile = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
  };