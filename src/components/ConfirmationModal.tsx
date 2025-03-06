// delete modal

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  type,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#000]/50 backdrop-blur-[3px] flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl min-w-[300px]">
        <p className="text-lg font-semibold mb-4">
          Are you sure you want to delete this {type}?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
