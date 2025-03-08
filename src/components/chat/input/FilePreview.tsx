import Image from "next/image";
import { XIcon } from "lucide-react";

interface FilePreviewProps {
  filePreview: string;
  onRemove: () => void;
}

const FilePreview = ({ filePreview, onRemove }: FilePreviewProps) => {
  return (
    <div className="absolute bottom-14 ">
      <div className="relative rounded-lg max-w-xs shadow-md">
        <Image
          src={filePreview}
          alt="Selected Image"
          width={160}
          height={160}
          className="rounded-lg max-h-60 max-w-full"
        />
        <button
          onClick={onRemove}
          className="absolute top-0 right-0 bg-black text-white rounded-full p-1"
        >
          <XIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default FilePreview;