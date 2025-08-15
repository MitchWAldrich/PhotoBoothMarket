export interface UserFieldsProps {
  callback: (
    name: string,
    email: string,
    event: string,
    isPastAudience: boolean,
  ) => void;
  hasImage: boolean;
  modalVisibility: boolean;
}
