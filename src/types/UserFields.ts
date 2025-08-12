export interface UserFieldsProps {
  callback: (
    name: string,
    email: string,
    event: string,
    isPastAudience: boolean,
  ) => void;
  modalVisibility: boolean;
}
