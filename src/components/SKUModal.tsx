// model to craete and update
import React, { useState } from "react";
import { SKU } from "../types";
import { FiX } from "react-icons/fi";

interface SKUModalProps {
  sku: SKU | null;
  onClose: () => void;
  onSave: (sku: Omit<SKU, "id">) => void;
}

const SKUModal: React.FC<SKUModalProps> = ({ sku, onClose, onSave }) => {
  const [formData, setFormData] = useState<Omit<SKU, "id">>({
    Label: sku?.Label || "",
    Class: sku?.Class || "",
    Department: sku?.Department || "",
    Price: sku?.Price || "",
    Cost: sku?.Cost || "",
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
            {sku?.id ? "Update" : "Create"} SKU
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
            <label className="text-[#202020] font-normal text-[14px]">
              Label
            </label>
            <input
              type="text"
              name="Label"
              value={formData.Label}
              onChange={handleChange}
              placeholder="Label"
              required
              className="w-full border border-[#C7C7C7] rounded-[6px] px-[14px] py-[11px] mt-1 text-[14px] text-[#202020] outline-none"
            />
          </div>

          <div>
            <label className="text-[#202020] font-normal text-[14px]">
              Class
            </label>
            <input
              type="text"
              name="Class"
              value={formData.Class}
              onChange={handleChange}
              placeholder="Class"
              required
              className="w-full border border-[#C7C7C7] rounded-[6px] px-[14px] py-[11px] mt-1 text-[14px] text-[#202020] outline-none"
            />
          </div>

          <div>
            <label className="text-[#202020] font-normal text-[14px]">
              Department
            </label>
            <input
              type="text"
              name="Department"
              value={formData.Department}
              onChange={handleChange}
              placeholder="Department"
              required
              className="w-full border border-[#C7C7C7] rounded-[6px] px-[14px] py-[11px] mt-1 text-[14px] text-[#202020] outline-none"
            />
          </div>

          <div>
            <label className="text-[#202020] font-normal text-[14px]">
              Price
            </label>
            <input
              type="number"
              name="Price"
              value={formData.Price}
              onChange={handleChange}
              placeholder="Price"
              required
              className="w-full border border-[#C7C7C7] rounded-[6px] px-[14px] py-[11px] mt-1 text-[14px] text-[#202020] outline-none"
            />
          </div>

          <div>
            <label className="text-[#202020] font-normal text-[14px]">
              Cost
            </label>
            <input
              type="number"
              name="Cost"
              value={formData.Cost}
              onChange={handleChange}
              placeholder="Cost"
              required
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

export default SKUModal;
