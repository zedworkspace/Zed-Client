import { PaperclipIcon } from "lucide-react";

interface FileUploadButtonProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const FileUploadButton = ({ onChange, onKeyDown }: FileUploadButtonProps) => {
  return (
    <label className="cursor-pointer absolute left-14">
      <PaperclipIcon className="w-5 h-5 text-gray-500" />
      <input type="file" className="hidden" onChange={onChange} onKeyDown={onKeyDown}/>
    </label>
  );
};

export default FileUploadButton;