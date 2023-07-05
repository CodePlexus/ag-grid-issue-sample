import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import { LicenseManager } from "ag-grid-enterprise";
// import { AllModules } from '@ag-grid-enterprise/all-modules';
import React, {
    useEffect,
    useMemo,
    useState,
} from "react";

import tableData from "./data.json"

LicenseManager.setLicenseKey(
    "[TRIAL]_this_AG_Grid_Enterprise_key_( AG-043118 )_is_granted_for_evaluation_only___Use_in_production_is_not_permitted___Please_report_misuse_to_( legal@ag-grid.com )___For_help_with_purchasing_a_production_key_please_contact_( info@ag-grid.com )___All_Front-End_JavaScript_developers_working_on_the_application_would_need_to_be_licensed___This_key_will_deactivate_on_( 31 July 2023 )____[v2]_MTY5MDc1ODAwMDAwMA==f7deb9985cb10bc1921d8a43ac3c1b44"
);


const TableComponent = () => {
    const { data } = tableData
    const [rowData, setRowData] = useState(data);

    const [gridApi, setGridApi] = useState(null);

    const [selectedRows, setSelectedRows] = useState([])

    const onSelectionChanged = (event) => {
        const selectedRowData = event.api.getSelectedRows();
        setSelectedRows(selectedRowData);
    };

    //   const [detailShow, setDetailShow] = useState(false);

    const [columnDefs, setColumnDefs] = useState([
        {
            headerCheckboxSelection: true,
            checkboxSelection: true,
            resizable: true,
            maxWidth: 50,
            // field: 'name' // replace with your actual field name
        },
        {
            headerName: "Statement Identifier",
            field: "statement_identifier",
            resizable: true,
            // editable: true,
            filter: true,
            minWidth: 150,
            // floatingFilter: true,
        },
        {
            headerName: "Account Code",
            field: "account.code",
            minWidth: 150,
            sortable: true,
            resizable: true,
            // editable: true,
        },
        {
            headerName: "Account Number",
            field: "account.number",
            minWidth: 150,
            sortable: true,
            resizable: true,
            // editable: true,
        },
        {
            headerName: "Company",
            field: "company",
            minWidth: 150,
            sortable: true,
            resizable: true,
            // editable: true,
        },
        {
            headerName: "Branch",
            field: "branch",
            minWidth: 150,
            sortable: true,
            resizable: true,
            // editable: true,
        },
        {
            headerName: "Flow Amount",
            field: "flow_amount",
            filter: true,
            minWidth: 150,
            comparator: (valueA, valueB) => {
                const numericValueA = Number(valueA.replace(/,/g, ''));
                const numericValueB = Number(valueB.replace(/,/g, ''));
                return numericValueA - numericValueB;
            },
            chartDataType: "series",
            enableValue: true,
            cellRenderer: 'flowAmountRenderer',
            valueGetter: (params) => params.data?.flow_amount && Number(params.data?.flow_amount)?.toLocaleString() || "",
            sortable: true,
            resizable: true,
        },
        {
            headerName: "Direction",
            field: "dir",
            minWidth: 150,
            filter: true,
            // // floatingFilter: true,
            sortable: true,
            // editable: true,
            resizable: true,
        },
        // {
        //   headerName: "Amount",
        //   field: "amount_debit",
        //   minWidth: 150,
        //   chartDataType: "series",
        //   cellRenderer: (params) => {
        //     return (
        //       <>
        //         {params?.data?.amount_debit
        //           ? Number(params?.data?.amount_debit)?.toLocaleString() || ""
        //           : ""}
        //       </>
        //     );
        //   },
        //   filter: true,
        //   // // floatingFilter: true,
        //   sortable: true,
        //   // editable: true,
        //   resizable: true,
        // },
        // {
        //   headerName: "Amount",
        //   field: "amount_credit",
        //   minWidth: 150,
        //   chartDataType: "series",
        //   cellRenderer: (params) => {
        //     return (
        //       <>
        //         {params?.data?.amount_credit
        //           ? Number(params?.data?.amount_credit)?.toLocaleString() || ""
        //           : ""}
        //       </>
        //     );
        //   },
        //   filter: true,
        //   // // floatingFilter: true,
        //   sortable: true,
        //   // editable: true,
        //   resizable: true,
        // },
        {
            headerName: "Flow Type",
            field: "flow_type",
            minWidth: 150,
            resizable: true,
            sortable: true,
            // cellRenderer: (params) => (
            //   <div className="row">
            //     {FlowAmountTypeList[params?.data?.flow_type]?.name}
            //   </div>
            // ),

            // editable: true,

            filter: true,
            // // floatingFilter: true,
        },
        {
            headerName: "Statement Type",
            field: "statement_type",
            minWidth: 150,
            resizable: true,
            sortable: true,
            // editable: true,
            // cellRenderer: (params) => (
            //   <div className="row">
            //     {StatementTypeList[params?.data?.statement_type]?.name}
            //   </div>
            // ),
            filter: true,
            // // floatingFilter: true,
        },
        {
            headerName: "Integration Date",
            field: "integration_date",
            minWidth: 150,
            chartDataType: "time",
            filter: true,
            // // floatingFilter: true,
            // editable: true,
            sortable: true,
            resizable: true,
        },
        {
            headerName: "Transaction Date",
            field: "transaction_date",
            minWidth: 150,
            chartDataType: "time",
            filter: true,
            // // floatingFilter: true,
            // editable: true,
            sortable: true,
            resizable: true,
        },

        {
            headerName: "Currency",
            field: "currency",
            minWidth: 150,
            filter: true,
            // // floatingFilter: true,
            sortable: true,
            // editable: true,
            resizable: true,
        },

        {
            headerName: "Value Date",
            field: "value_date",
            chartDataType: "time",
            filter: true,
            minWidth: 150,
            // // floatingFilter: true,
            sortable: true,
            // editable: true,
            resizable: true,
        },
        {
            headerName: "Description",
            field: "description",
            minWidth: 150,

            filter: true,
            // // floatingFilter: true,
            resizable: true,
            // editable: true,
            sortable: true,
        },
        {
            headerName: "Reference",
            field: "reference",
            minWidth: 150,
            filter: true,
            // floatingFilter: true,
            sortable: true,
            // editable: true,
            resizable: true,
        },
        {
            headerName: "Bank",
            field: "bank",
            minWidth: 150,

            filter: true,
            // floatingFilter: true,
            sortable: true,
            // editable: true,
            resizable: true,
        },
        {
            headerName: "BTC",
            field: "btc",
            minWidth: 150,

            filter: true,
            // floatingFilter: true,
            sortable: true,
            // editable: true,
            resizable: true,
        },
        // {
        //   headerName: "Flow Code",
        //   field: "flow_code",

        // filter: true,
        //   // floatingFilter: true,
        //   sortable: true,
        //   // editable: true,
        //   resizable: true,
        // },
        {
            headerName: "Statement Sequence",
            field: "statement_id",
            minWidth: 150,

            filter: true,
            // floatingFilter: true,
            sortable: true,
            // editable: true,
            resizable: true,
        },
        {
            headerName: "Statement Date",
            field: "statement_date",
            chartDataType: "time",
            minWidth: 150,
            filter: true,
            // floatingFilter: true,
            sortable: true,
            // editable: true,
            resizable: true,
        },
        {
            headerName: "Collection Date",
            field: "collection_date",
            minWidth: 150,
            chartDataType: "time",
            filter: true,
            // floatingFilter: true,
            sortable: true,
            // editable: true,
            resizable: true,
        },
        // {
        //   headerName: "Source file",
        //   resizable: true,
        //   cellRenderer: (params) => (
        //     <div className="row">
        //       {params.data?.source_file && (
        //         <Button
        //           icon={<DownloadOutlined />}
        //           onClick={() => {
        //             handleDownload(params.data?.source_file);
        //           }}
        //           size="large"
        //           // onClick={() => handleDownload(file)}
        //           style={{
        //             // display: "flex",
        //             // alignItems: "center",
        //             // width: "150px",
        //             backgroundColor: "rgb(53, 60, 68)",
        //             color: "white",
        //             borderRadius: "0px",
        //           }}
        //         ></Button>
        //       )}
        //     </div>
        //   ),
        //   // width: 250,
        //   sortable: false,
        //   filter: false,
        // },

        // {
        //   headerName: "Actions",
        //   cellRenderer: (params) => (
        //     <div className="row">
        //       <Button
        //         onClick={() => {
        //           setBankTransactionSummary(params.data);
        //           setShowDetail(true);
        //         }}
        //         style={{
        //           display: "flex",
        //           alignItems: "center",
        //           width: "40px",
        //           backgroundColor: "rgb(53, 60, 68)",
        //           color: "white",
        //           borderRadius: "0px",
        //         }}
        //       >
        //         <i class="fa fa-eye"></i>
        //       </Button>
        //     </div>
        //   ),
        //   width: 250,
        //   sortable: false,
        //   resizable: false,
        //   filter: false,
        // },
    ]);

    const getContextMenuItems = (params) => {
        const defaultMenuItems = params.defaultItems?.slice();

        const filteredMenuItems = defaultMenuItems?.filter((menuItem) => {
            return (
                menuItem !== "cut" &&
                menuItem !== "copyWithHeaders" &&
                menuItem !== "copyWithGroupHeaders" &&
                menuItem !== "paste" &&
                menuItem !== "export" &&
                menuItem !== "separator"
            );
        });

        // Create and return an array of custom menu items
        const customMenuItems = [
            {
                name: "Option 1",
                action: () => {
                    // Handle custom action 1
                    // console.log('Custom Action 1 clicked!', params);
                },
                icon: '<i class="fa fa-eye" aria-hidden="true"></i>',
            },
            {
                name: "Option 2",
                action: () => {
                    // Handle custom action 1
                    // console.log('Custom Action 1 clicked!', params);
                },
                icon: '<i class="fa fa-download" aria-hidden="true"></i>',
            },
            // Add more custom menu items as needed
        ];

        const allMenuItems = [
            ...customMenuItems,
            "separator",
            ...filteredMenuItems,
        ];

        return allMenuItems;
    };


    const statusBar = useMemo(() => {
        return {
            statusPanels: [
                { statusPanel: "agTotalAndFilteredRowCountComponent", align: "left" },
                { statusPanel: "agFilteredRowCountComponent" },
                { statusPanel: "agSelectedRowCountComponent" },
                { statusPanel: "agAggregationComponent" },
            ],
        };
    }, []);

    const autoGroupColumnDef = useMemo(() => {
        return {
            minWidth: 220,
        };
    }, []);

    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            // minWidth: 150,
            // allow every column to be aggregated
            enableValue: true,
            // allow every column to be grouped
            enableRowGroup: true,
            // allow every column to be pivoted
            // enablePivot: true,
            sortable: true,
            cellDataType: false,
            suppressAutoSize: true
            // // filter: true,
        };
    }, []);

    const chartThemeOverrides = useMemo(() => {
        return {
            common: {
                title: {
                    enabled: true,
                    text: "Table",
                },
            },
            column: {
                axes: {
                    category: {
                        label: {
                            rotation: 0,
                        },
                    },
                },
            },
        };
    }, []);

    function flowAmountRenderer(params) {
        const { value } = params;

        return (
            <span>
                {value
                    ? value?.toLocaleString() || ""
                    : ""}
            </span>
        );
    }


    const gridOptions = useMemo(() => ({
        suppressAutoSize: false,
        suppressColumnVirtualisation: true,
        groupSelectsChildren: true,
        animateRows: true,
        components: {
            flowAmountRenderer: flowAmountRenderer,
        },
        // suppressRowTransform: false,

    }), [])


    const onGridReady = (params) => {
        setGridApi(params.api);
    };

    return (
        <>

            <div style={{ display: "flex" }}>
                <div style={{ width: "100%", padding: "40px" }}>
                    <div style={{ bordorRadius: "15px" }}
                    >

                        <div
                            className="ag-theme-alpine mt-30"
                            style={{ height: 550, width: "100%" }}
                        >
                            <AgGridReact
                                className="bank-transaction-summary"
                                onGridReady={onGridReady}
                                gridOptions={gridOptions}
                                suppressRowClickSelection={true}
                                rowData={rowData}
                                columnDefs={columnDefs}
                                rowSelection="multiple"
                                defaultColDef={defaultColDef}
                                enableRangeSelection={true}
                                enableFillHandle={true}
                                suppressClearOnFillReduction={true}
                                statusBar={statusBar}
                                getContextMenuItems={getContextMenuItems}
                                autoGroupColumnDef={autoGroupColumnDef}
                                rowGroupPanelShow={"always"}
                                // sideBar={true}
                                onSelectionChanged={onSelectionChanged}
                                enableCharts={true}
                                chartThemeOverrides={chartThemeOverrides}
                                suppressDragLeaveHidesColumns={true}
                                suppressMakeColumnVisibleAfterUnGroup={true}
                                suppressRowGroupHidesColumns={true}
                            ></AgGridReact>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default TableComponent;
