$(document).ready(function () {
    var usergroupsDestination;
    function onChange() {
        if ("usergroupsKDV" in window) {
            //console.log("event :: change");
        }
    }
    function onSelect(e) {
        if ("console" in window) {
            if (e.dataItem) {
                var dataItem = e.dataItem;
                if (dataItem.parent_id == "Kinh Dương Vương") {
                    usergroupsDestination = "All Users/" + dataItem.name;
                    console.log(usergroupsDestination);
                    $("#PhongBanNV").val(usergroupsDestination);
                } else if (dataItem.parent_id == "Lâm Hoành") {
                    usergroupsDestination = "All Users/New Factory - ABC Lam Hoanh/" + dataItem.name;
                    console.log(usergroupsDestination);
                    $("#PhongBanNV").val(usergroupsDestination);
                } else if (dataItem.parent_id == "HACCP-LH") {
                    usergroupsDestination = "All Users/New Factory - ABC Lam Hoanh/HACCP/" + dataItem.name;
                    console.log(usergroupsDestination);
                    $("#PhongBanNV").val(usergroupsDestination);
                } else if (dataItem.parent_id == "Temporary Trung Thu") {
                    usergroupsDestination = "All Users/Temporary Trung Thu/" + dataItem.name;
                    console.log(usergroupsDestination);
                    $("#PhongBanNV").val(usergroupsDestination);
                } else if (dataItem.parent_id == "Dịch Vụ") {
                    usergroupsDestination = "All Users/To Ve Sinh/Dich vu/" + dataItem.name;
                    console.log(usergroupsDestination);
                    $("#PhongBanNV").val(usergroupsDestination);
                } else if (dataItem.parent_id == "Tổ Vệ Sinh") {
                    usergroupsDestination = "All Users/To Ve Sinh/" + dataItem.name;
                    console.log(usergroupsDestination);
                    $("#PhongBanNV").val(usergroupsDestination);
                }
            }
            else {
                console.log("event :: select");
            }
        }
    }

    $("#usergroupsKDV").kendoComboBox({
        dataTextField: "name",
        dataValueField: "id",
        filter: "startswith",
        height: 400,
        dataSource: {
            data: UserGroupKDV,
            group: { field: "parent_id" }
        },
        select: onSelect,
        change: onChange,
    })
})