// model to create and update stores

import React, { useState } from "react";
import { Store } from "../types";
import { FiX } from "react-icons/fi";

interface StoreModalProps {
  store: Store | null;
  onClose: () => void;
  onSave: (store: Omit<Store, "Seq No.">) => void;
}

const StoreModal: React.FC<StoreModalProps> = ({ store, onClose, onSave }) => {
  const [formData, setFormData] = useState<Omit<Store, "Seq No.">>({
    ID: store?.ID || "",
    Label: store?.Label || "",
    City: store?.City || "",
    State: store?.State || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed z-10 inset-0 bg-[#000]/60 backdrop-blur-[3px] flex items-center justify-center">
      <div className="w-full max-w-[439px] bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center px-[20px] py-[16px] border-b-[1.5px] border-[#E4E6F6]">
          <h2 className="text-[#2C2C2C] font-semibold text-[20px]">
            Create New Model
          </h2>
          <div
            className="w-[24px] h-[24px] flex items-center justify-center cursor-pointer"
            onClick={onClose}
          >
            <FiX />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-[20px] space-y-5">
          <div>
            <label className="text-[#202020] font-normal text-[14px]">ID</label>
            <input
              type="text"
              name="ID"
              value={formData.ID}
              onChange={handleChange}
              placeholder="ID"
              className="w-full border border-[#C7C7C7] rounded-[6px] px-[14px] py-[11px] mt-1 text-[14px] text-[#202020] outline-none"
            />
          </div>

          <div>
            <label className="text-[#202020] font-normal text-[14px]">
              Label
            </label>
            <input
              type="text"
              name="Label"
              value={formData.Label}
              onChange={handleChange}
              placeholder="Label"
              className="w-full border border-[#C7C7C7] rounded-[6px] px-[14px] py-[11px] mt-1 text-[14px] text-[#202020] outline-none"
            />
          </div>
          <div>
            <label className="text-[#202020] font-normal text-[14px]">
              City
            </label>
            <input
              type="text"
              name="City"
              value={formData.City}
              onChange={handleChange}
              placeholder="City"
              className="w-full border border-[#C7C7C7] rounded-[6px] px-[14px] py-[11px] mt-1 text-[14px] text-[#202020] outline-none"
            />
          </div>
          <div>
            <label className="text-[#202020] font-normal text-[14px]">
              State
            </label>
            <input
              type="text"
              name="State"
              value={formData.State}
              onChange={handleChange}
              placeholder="State"
              className="w-full border border-[#C7C7C7] rounded-[6px] px-[14px] py-[11px] mt-1 text-[14px] text-[#202020] outline-none"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              className="flex-1 px-[12px] py-[5px] bg-[#E7E6FA] text-[#0ec297] rounded-[10px] text-center"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="flex-1 px-[12px] py-[5px] bg-[#0ec297] text-white rounded-[10px] text-center"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StoreModal;
