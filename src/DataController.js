class DataController {

    structureOrderData(data) {
        var tablesNumbers = []
        for (var i = 0; i < data.length; i++) { 
            tablesNumbers.push(data[i].tableNumber)
        }

        var uniqueTablesNumbers = [ ...new Set(tablesNumbers) ]; 

        var tables = [];
        uniqueTablesNumbers.forEach(function(tableNumber) {
            var table = {
                tableNumber: tableNumber,
                orders: []
            }
            tables.push(table);
        }) 

        var orderTableNumber;
        for (var x = 0; x < data.length; x++) {
            for (var y = 0; y < tables.length; y++) {
            orderTableNumber = data[x].tableNumber
            if (orderTableNumber === tables[y].tableNumber) {
                tables[y].orders.push(data[x])
            } else {
            }
        }}
        console.log(tables)
        return tables
    }
}
module.exports = DataController


