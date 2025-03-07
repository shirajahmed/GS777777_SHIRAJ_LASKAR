// planning screen

import { useEffect, useState } from "react";

import { AllCommunityModule, ColDef, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import Preloader from "../components/Preloader";
import { fetchCalculations } from "../services/api";

ModuleRegistry.registerModules([AllCommunityModule]);

interface PlanningData {
  Store: string;
  SKU: string;
  Week: string;
  "Sales Units": number;
  "Sales Dollars": string;
  "Cost Dollars": string;
  "GM Dollars": string;
  "GM %": string;
}

const PlanningPage = () => {
  const [planningData, setPlanningData] = useState<PlanningData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlanningData();
  }, []);

  const loadPlanningData = async () => {
    setLoading(true);
    const data = await fetchCalculations();
    setPlanningData(data);
    setLoading(false);
  };

  // Generate column definitions dynamically based on weeks
  const generateColumnDefs = () => {
    const weeks = Array.from(
      new Set(planningData.map((item) => item.Week))
    ).sort();

    const columnDefs: ColDef[] = [
      { headerName: "Store", field: "Store", pinned: "left", width: 120 },
      { headerName: "SKU", field: "SKU", pinned: "left", width: 120 },
    ];

    weeks.forEach((week) => {
      // Define the column group for the week
      const weekGroup = {
        headerName: `Week ${weeks.indexOf(week) + 1}`,
        marryChildren: true, // Ensure children stay together
        children: [
          {
            headerName: "Sales Units",
            field: `${week}_SalesUnits`,
            width: 110,
          },
          {
            headerName: "Sales Dollars",
            field: `${week}_SalesDollars`,
            width: 110,
          },
          {
            headerName: "GM Dollars",
            field: `${week}_GMDollars`,
            width: 110,
          },
          {
            headerName: "GM Percent",
            field: `${week}_GMPercent`,
            width: 110,
          },
        ],
      };

      // Add the week group to the column definitions
      columnDefs.push(weekGroup);
    });

    return columnDefs;
  };
  const transformData = (data: PlanningData[]) => {
    const transformedData: Record<
      string,
      { Store: string; SKU: string; [key: string]: string | number }
    > = {};

    data.forEach((item) => {
      const key = `${item.Store}-${item.SKU}`;
      if (!transformedData[key]) {
        transformedData[key] = { Store: item.Store, SKU: item.SKU };
      }
      transformedData[key][`${item.Week}_SalesUnits`] = item["Sales Units"];
      transformedData[key][`${item.Week}_SalesDollars`] = item["Sales Dollars"];
      transformedData[key][`${item.Week}_GMDollars`] = item["GM Dollars"];
      transformedData[key][`${item.Week}_GMPercent`] = item["GM %"];
    });

    return Object.values(transformedData);
  };

  const defaultColDef: ColDef = {
    sortable: false,
    resizable: true,
    filter: false,
  };

  return (
    <div className="bg-white shadow flex flex-col max-h-full p-[20px]">
      <div className="p-4 h-full overflow-hidden">
        {loading ? (
          <Preloader />
        ) : (
          <div
            className="ag-theme-alpine"
            style={{ height: "600px", width: "100%" }}
          >
            <AgGridReact
              rowData={transformData(planningData)}
              columnDefs={generateColumnDefs()}
              defaultColDef={defaultColDef}
              suppressRowDrag={true}
              headerHeight={50}
              rowHeight={40}
              pagination={true}
              paginationPageSize={20}
              animateRows={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanningPage;
