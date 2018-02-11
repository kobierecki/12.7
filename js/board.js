var board = {
    name: 'Kanban Board',
    addColumn: function(column) {
        this.$element.append(column.$element);
        initSortable();
    },
    $element: $('#board .column-container')
};

$('.create-column').click(function(){
    var columnName = prompt('Enter a column name');
    if (columnName === "" || columnName === null){
        alert("Give a name");
        return;
    } else {
        $.ajax({
            url: baseUrl + '/column',
            method: 'POST',
            data: {
                name: columnName
            },
            success: function(response){
                var column = new Column(response.id, columnName);
                board.addColumn(column);
            }
        })   
    } 
});

function initSortable() {
    $('.column-card-list').sortable({
        connectWith: '.column-card-list',
        placeholder: 'card-placeholder',
        receive: function(event, ui){
            cardId = ui.item[0].id;
            cardName = ui.item[0].innerText;
            targetedColumnId = ui.item[0].parentElement.id;
            console.log(ui.item[0]);
            console.log(cardName);
            console.log(targetedColumnId);
            Card.moveCard(cardId, cardName, targetedColumnId);
        }
    }).disableSelection();
}