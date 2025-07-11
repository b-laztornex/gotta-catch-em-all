import React from "react";
import { DialogClose } from "@/components/ui/dialog";

interface ModalFooterProps {
  onClose: () => void;
}

const ModalFooter: React.FC<ModalFooterProps> = ({ onClose }) => (
  <div className="px-4 py-2 bg-gray-50 flex justify-end">
    <DialogClose asChild>
      <button
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        onClick={onClose}
      >
        Close
      </button>
    </DialogClose>
  </div>
);

export default ModalFooter;
