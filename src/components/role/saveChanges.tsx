import React from "react";
import { Button } from "@/components/ui/button";

interface SaveChangesProps {
  onClick: () => void;
  onCancel: () => void;
  disabled?: boolean;
}

const SaveChanges: React.FC<SaveChangesProps> = ({ onClick, onCancel, disabled }) => {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-xl bg-secondary p-4 rounded-lg shadow-lg flex items-center justify-between">
      <p className="text-sm text-gray-200">Careful! You have unsaved changes.</p>
      
      <div className="flex gap-3">
        <Button
          onClick={onCancel}
          className="bg-none text-white hover:bg-secondary-foreground"
        >
          Reset
        </Button>
        <Button
          onClick={onClick}
          disabled={disabled}
          className="bg-green-700 text-white hover:bg-green-800 px-4 py-2"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default SaveChanges;
