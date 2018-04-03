class DataController {

    structureOrderData(data) {
        var tablesNumbers = []
        for (var i = 0; i < data.length; i++) {
            tablesNumbers.push(data[i].tableNb)
        }

        var uniqueTablesNumbers = [ ...new Set(tablesNumbers) ];

        var tables = [];
        for (var y = 0; y < uniqueTablesNumbers.length; y++){
            var table = {
                tableNb: uniqueTablesNumbers[y],
                orders: []
            }
            tables.push(table);
        }

        var orderTableNumber;
        for (var x = 0; x < data.length; x++) {
            for (var z = 0; z < tables.length; z++) {
                orderTableNumber = data[x].tableNb
                if (orderTableNumber === tables[z].tableNb) {
                    tables[z].orders.push(data[x])
                } else {
                }
            }
        }
        return tables
    }
}
module.exports = DataController


