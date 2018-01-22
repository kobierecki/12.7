function Column(id, name){
    var self = this;
    this.id = id;
    this.name = name || 'No name given';
    this.$element = createColumn();

    function createColumn() {
        var $column = $('<div>').addClass('column');
        var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
        var $columnCardList = $('<ul>').addClass('column-card-list');
        var $columnDelete = $('<button>').addClass('btn-delete').text('x');
        var $columnAddCard = $('<button>').addClass('add-card').text('+');

        $columnDelete.click(function(){
            self.removeColumn();
        });

        $columnAddCard.click(function(){
            var cardName = prompt('Enter the name of the card');
            $.ajax({
                url: baseUrl + '/card',
                method: 'POST',
                data: {
                    name: cardName,
                    bootcamp_kanban_column_id: self.id
                },
                success: function(response){
                    var card = new Card(response.id, cardName);
                    self.addCard(card);
                }
            })
        });

        $column.append($columnTitle);
        $column.append($columnDelete);
        $column.append($columnAddCard);
        $column.append($columnCardList);

        return $column;
    }
}

Column.prototype.addCard = function(card) {
        this.$element.children('ul').append(card.$element);
    }

Column.prototype.removeColumn = function() {
        var self = this;
        $.ajax({
            url: baseUrl + '/column/' + self.id,
            method: 'DELETE',
            success: function(){
                self.$element.remove();
        }
    })
}