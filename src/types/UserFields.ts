export interface UserFieldsProps {
  callback: (
    staffName: string,
    name: string,
    email: string,
    event: string,
    isPastAudience: boolean | null,
  ) => void;
  hasImage: boolean;
  modalVisibility: boolean;
}
