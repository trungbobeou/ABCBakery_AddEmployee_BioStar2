$(document).ready(function () {
    var usergroupsDestination;
    var dateEditor = function (cell, onRendered, success, cancel) {
        //cell - the cell component for the editable cell
        //onRendered - function to call when the editor has been rendered
        //success - function to call to pass thesuccessfully updated value to Tabulator
        //cancel - function to call to abort the edit and return to a normal cell

        //create and style input
        var cellValue = luxon.DateTime.fromFormat(cell.getValue(), "dd/MM/yyyy").toFormat("yyyy-MM-dd"),
            input = document.createElement("input");

        input.setAttribute("type", "date");

        input.style.padding = "4px";
        input.style.width = "100%";
        input.style.boxSizing = "border-box";

        input.value = cellValue;

        onRendered(function () {
            input.focus();
            input.style.height = "100%";
        });

        function onChange() {
            if (input.value != cellValue) {
                success(luxon.DateTime.fromFormat(input.value, "yyyy-MM-dd").toFormat("dd/MM/yyyy"));
            } else {
                cancel();
            }
        }

        //submit new value on blur or change
        input.addEventListener("blur", onChange);

        //submit new value on enter
        input.addEventListener("keydown", function (e) {
            if (e.keyCode == 13) {
                onChange();
            }

            if (e.keyCode == 27) {
                cancel();
            }
        });

        return input;
    };

    var tabledata = [
        //{ id: "", name: "", department: "", user_title: "", phone: "", email: "", user_group: "", start_datetime: "", expiry_datetime: "", csn: "" }
    ];

    var city = {
        GZ: 'GuangZhou',
        SH: 'ShangHai',
        TPHCM: 'concac'
    };

    var table = new Tabulator("#example-table", {
        height: "311px",
        reactiveData: true, //turn on data reactivity
        data: tabledata, //load data into table
        layout: "",
        columns: [
            { title: "user_id", field: "id", width: 150, headerHozAlign: "center", hozAlign: "left", editor: "input", },
            { title: "name", field: "name", width: 300, headerHozAlign: "center", editor: "input" },
            { title: "department", field: "department", width: 150, headerHozAlign: "center" },
            { title: "user_title", field: "cmnd", width: 150, headerHozAlign: "center", editor: "input" },
            { title: "phone", field: "phone", width: 180, headerHozAlign: "center", editor: "input" },
            { title: "email", field: "email", width: 175, headerHozAlign: "center", editor: "input" },
            { title: "user_group", field: "user_group", width: 350, headerHozAlign: "center", editor: "input" },
            { title: "start_datetime", field: "start_datetime", headerHozAlign: "center", width: 150 },
            { title: "expiry_datetime", field: "expiry_datetime", headerHozAlign: "center", width: 150 },
            { title: "csn", field: "csn", width: 150, headerHozAlign: "center" },

        ],
    });

    //trigger download of data.csv file
    document.getElementById("download-csv").addEventListener("click", function () {
        table.download("csv", "data.csv");
    });

    //trigger download of data.json file
    document.getElementById("download-json").addEventListener("click", function () {
        table.download("json", "data.json");
    });

    //trigger download of data.xlsx file
    document.getElementById("download-xlsx").addEventListener("click", function () {
        table.download("xlsx", "data.xlsx", { sheetName: "My Data" });
    });

    //trigger download of data.pdf file
    document.getElementById("download-pdf").addEventListener("click", function () {
        table.download("pdf", "data.pdf", {
            orientation: "portrait", //set page orientation to portrait
            title: "Example Report", //add title to report
        });
    });

    //trigger download of data.html file
    document.getElementById("download-html").addEventListener("click", function () {
        table.download("html", "data.html", { style: true });
    });

    //add row to bottom of table on button click
    document.getElementById("reactivity-add").addEventListener("click", function () {
        tabledata.push({ name: "", user_groups: usergroupsDestination });
    });

    //remove bottom row from table on button click
    document.getElementById("reactivity-delete").addEventListener("click", function () {
        tabledata.pop();
    });

    //update name on first row in table on button click
    document.getElementById("reactivity-update").addEventListener("click", function () {
        tabledata[0].name = "IVE BEEN UPDATED";
    });
})