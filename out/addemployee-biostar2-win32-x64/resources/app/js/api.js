$(document).ready(function () {
    $("#usersTable").DataTable({
        scrollY: 100,
        scrollX: true,
        searching: true
    });

    var i = 0;
    var d = new Date();
    var starDate = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear() + " 12:00:00 AM";
    var endDate = "12/31/2030  11:00:00 PM";
    var string = [];
    var f = 0;

    $("#btnAdd").on("click", function () {
        f = f+1;
        var table = $("#usersTable").DataTable();
        var IdNV = parseInt($("#IdNV").val());
        var TenNV = $("#TenNV").val();
        var TitleNV = $("#TitleNV").val();
        var PhoneNV = $("#PhoneNV").val();
        table.row
            .add([
                IdNV,
                TenNV,
                "",
                TitleNV,
                PhoneNV,
                "",
                "All User/Business Support",
                starDate,
                endDate,
                ""
            ])
            .draw();
    })

    $("#btnExport").on("click", function () {
        var Title = ['user_id', 'name', 'department', 'user_title', 'phone', 'email', 'user_group', 'start_datetime', 'expiry_datetime', 'csn']
        tableToCSV();
    })
})

function tableToCSV() {
 
    // Variable to store the final csv data
    var csv_data = [];

    // Get each row data
    var rows = document.getElementsByClassName('tr,th,div');
    for (var i = 0; i < rows.length; i++) {

        // Get each column data
        var cols = rows[i].querySelectorAll('td,th');

        // Stores each csv row data
        var csvrow = [];
        for (var j = 0; j < cols.length; j++) {

            // Get the text data of each cell
            // of a row and push it to csvrow
            csvrow.push(cols[j].innerHTML);
        }

        // Combine each column value with comma
        csv_data.push(csvrow.join(","));
    }

    // Combine each row data with new line character
    csv_data = csv_data.join('\n');

    // Call this function to download csv file 
    downloadCSVFile(csv_data);

}

function downloadCSVFile(csv_data) {

    // Create CSV file object and feed
    // our csv_data into it
    CSVFile = new Blob([csv_data], {
        type: "text/csv"
    });

    // Create to temporary link to initiate
    // download process
    var temp_link = document.createElement('a');

    // Download csv file
    temp_link.download = "GfG.csv";
    var url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;

    // This link should not be displayed
    temp_link.style.display = "none";
    document.body.appendChild(temp_link);

    // Automatically click the link to
    // trigger download
    temp_link.click();
    document.body.removeChild(temp_link);
}