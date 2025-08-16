export interface UserFieldsProps {
  callback: (
    name: string,
    email: string,
    event: string,
    isPastAudience: boolean | null,
  ) => void;
  hasImage: boolean;
  modalVisibility: boolean;
}
