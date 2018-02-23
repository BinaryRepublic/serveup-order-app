class DataController {

    structureOrderData(data) {
        var tablesNumbers = []
        for (var i = 0; i < data.length; i++) { 
            tablesNumbers.push(data[i].tableNumber)
        }
        
        var uniqueTablesNumbers = [ ...new Set(tablesNumbers) ]; 

        var tables = [];
        for (var y = 0; y < uniqueTablesNumbers.length; y++){
            var table = {
                tableNumber: uniqueTablesNumbers[y],
                orders: []
            }
            tables.push(table);
        }

        var orderTableNumber;
        for (var x = 0; x < data.length; x++) {
            for (var z = 0; z < tables.length; z++) {
                orderTableNumber = data[x].tableNumber
                if (orderTableNumber === tables[z].tableNumber) {
                    tables[z].orders.push(data[x])
                } else {
                }
            }
        }
        return tables
    }
}
module.exports = DataController


