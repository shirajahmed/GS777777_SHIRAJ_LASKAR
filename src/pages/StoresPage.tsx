import React, { useEffect, useState } from "react";
import {
  createStore,
  deleteStore,
  fetchStores,
  updateStore,
} from "../services/api";
import { Store } from "../types";
import Preloader from "../components/Preloader";
import StoreModal from "../components/StoreModal";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { AllCommunityModule, ModuleRegistry, ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import ConfirmationModal from "../components/ConfirmationModal";

ModuleRegistry.registerModules([AllCommunityModule]);

const StoresPage = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [storeToDelete, setStoreToDelete] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStores();
  }, []);

  const loadStores = async () => {
    setLoading(true);
    const data = await fetchStores();
    setStores(data);
    setLoading(false);
  };

  const handleSave = async (store: Omit<Store, "Seq No.">) => {
    if (selectedStore) {
      await updateStore(selectedStore.id, store);
    } else {
      await createStore(store);
    }
    loadStores();
  };

  const handleDelete = async () => {
    if (storeToDelete) {
      setIsConfirmModalOpen(false);
      setLoading(true);
      await deleteStore(storeToDelete.id);
      loadStores();
      setStoreToDelete(null);
    }
  };

  const columnDefs: ColDef<Store>[] = [
    {
      headerName: "",
      cellRenderer: (params: { data: Store }) => (
        <div className="inline-flex space-x-2">
          <FiEdit
            onClick={() => {
              setSelectedStore(params.data);
              setIsModalOpen(true);
            }}
            className="cursor-pointer"
          />
          <FiTrash2
            onClick={() => {
              setStoreToDelete(params.data);
              setIsConfirmModalOpen(true);
            }}
            className="cursor-pointer"
          />
        </div>
      ),
      width: 10,
    },
    { headerName: "ID", field: "id", rowDrag: true, width: 100 },
    { headerName: "Label", field: "Label", width: 150 },
    { headerName: "City", field: "City", width: 150 },
    { headerName: "State", field: "State", width: 150 },
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
              rowData={stores}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              suppressCellFocus={true}
              headerHeight={50}
              rowHeight={50}
              animateRows={true}
              rowDragManaged={true}
              onRowDragEnd={(event) => {
                console.log("Row dragged:", event.node.data);
              }}
            />
          </div>
        )}

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#0ec297] p-2 rounded text-white mt-4"
        >
          Add Store
        </button>
        {isModalOpen && (
          <StoreModal
            store={selectedStore}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedStore(null);
            }}
            onSave={handleSave}
          />
        )}
        {isConfirmModalOpen && (
          <ConfirmationModal
            isOpen={isConfirmModalOpen}
            onClose={() => setIsConfirmModalOpen(false)}
            onConfirm={handleDelete}
            type="store"
          />
        )}
      </div>
    </div>
  );
};

export default StoresPage;
