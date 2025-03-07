import React, { useEffect, useState } from "react";
import { createSKU, deleteSKU, fetchSKUs, updateSKU } from "../services/api";
import { SKU } from "../types";
import Preloader from "../components/Preloader";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { AllCommunityModule, ModuleRegistry, ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import ConfirmationModal from "../components/ConfirmationModal";
import SKUModal from "../components/SKUModal";

ModuleRegistry.registerModules([AllCommunityModule]);

const SKUsPage = () => {
  const [skus, setSKUs] = useState<SKU[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedSKU, setSelectedSKU] = useState<SKU | null>(null);
  const [skuToDelete, setSKUToDelete] = useState<SKU | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSKUs();
  }, []);

  const loadSKUs = async () => {
    setLoading(true);
    const data = await fetchSKUs();
    setSKUs(data);
    setLoading(false);
  };

  const handleSave = async (sku: Omit<SKU, "id">) => {
    if (selectedSKU) {
      await updateSKU(selectedSKU.id, sku);
    } else {
      await createSKU(sku);
    }
    loadSKUs();
  };

  const handleDelete = async () => {
    if (skuToDelete) {
      setIsConfirmModalOpen(false);
      setLoading(true);
      await deleteSKU(skuToDelete.id);
      loadSKUs();
      setSKUToDelete(null);
    }
  };

  const columnDefs: ColDef<SKU>[] = [
    {
      headerName: "",
      cellRenderer: (params: { data: SKU }) => (
        <div className="inline-flex space-x-2">
          <FiEdit
            onClick={() => {
              setSelectedSKU(params.data);
              setIsModalOpen(true);
            }}
            className="cursor-pointer"
          />
          <FiTrash2
            onClick={() => {
              setSKUToDelete(params.data);
              setIsConfirmModalOpen(true);
            }}
            className="cursor-pointer"
          />
        </div>
      ),
      width: 10,
    },
    { headerName: "SKU", field: "id", width: 100 },
    { headerName: "Label", field: "Label", width: 200 },
    { headerName: "Class", field: "Class", width: 150 },
    { headerName: "Department", field: "Department", width: 150 },
    { headerName: "Price", field: "Price", width: 100 },
    { headerName: "Cost", field: "Cost", width: 100 },
  ];

  const defaultColDef: ColDef = {
    flex: 1,
    sortable: false,
    filter: false,
    resizable: true,
  };

  const gridHeight = window.innerHeight - 250;

  return (
    <div className="bg-white shadow flex flex-col max-h-full p-[20px]">
      <div className="p-4 h-full overflow-hidden">
        {loading ? (
          <Preloader />
        ) : (
          <div
            className="h-screen w-full overflow-auto"
            style={{ height: `${gridHeight}px`, width: "100%" }}
          >
            <AgGridReact
              rowData={skus}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              suppressCellFocus={true}
              headerHeight={50}
              rowHeight={50}
              animateRows={true}
              pagination={true}
              paginationPageSize={10}
            />
          </div>
        )}

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#0ec297] p-2 rounded text-white mt-4"
        >
          Add SKU
        </button>
        {isModalOpen && (
          <SKUModal
            sku={selectedSKU}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedSKU(null);
            }}
            onSave={handleSave}
          />
        )}
        {isConfirmModalOpen && (
          <ConfirmationModal
            isOpen={isConfirmModalOpen}
            onClose={() => setIsConfirmModalOpen(false)}
            onConfirm={handleDelete}
            type="SKU"
          />
        )}
      </div>
    </div>
  );
};

export default SKUsPage;
