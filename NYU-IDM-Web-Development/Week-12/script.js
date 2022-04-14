var $tile = $("<div />", {
    class: "tile"
});

var $row = $("<div />", {
    class: "row"
})

const createGrid = n => {
    for(let r = 0; r < n; r++) {
        let $newRow = $row.clone();
        for(let c = 0; c < n; c++) {
            $newRow.append($tile.clone());
        }
        $("#container").append($newRow);
    }
}

// Scene Creation
// Title Screen
