
class DataController {


    structureOrderData(data) {
        var tables = []
        for (var i = 0; i < data.length; i++) { 
            tables.push(data[i].tableNumber)
        var uniq = [ ...new Set(tables) ]; 
        console.log(uniq)
        }

        var orderTableNumber;
        for (var x = 0; x < data.length; x++) {
            for (var y = 0; y < uniq.length; y++) {
            orderTableNumber = data[x].tableNumber
            console.log(orderTableNumber)
            console.log(uniq[y])
                if (orderTableNumber === uniq[y]) {
                    uniq[y].push(data[x])
                console.log(uniq)
            } else {
            }
        }}
    }


}
module.exports = DataController


// uniq = [5, 3, 7, 6]

// Insgesammt 8 orders von 4 Tischen

