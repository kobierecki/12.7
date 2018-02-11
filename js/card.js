function Card(id, name) {
        var self = this;

        this.id = id;
        this.name = name || 'No name given';
        this.$element = createCard();

        function createCard() {
            var $card = $('<li>').addClass('card');
            var $cardDescription = $('<p>').addClass('card-description').text(self.name);
            var $cardDelete = $('<button>').addClass('btn-delete-card').text('x');

            $cardDelete.click(function(){
                self.removeCard();
            });

            $card.append($cardDelete);
            $card.append($cardDescription);
            $card.append($cardDescription);

            return $card;
        }; 
};

Card.prototype.removeCard = function() {
        var self = this;
        $.ajax({
            url: baseUrl + '/card/' + self.id,
            method: 'DELETE',
            success: function(){
                self.$element.remove();
        }
    });
}

Card.prototype.moveCard = function(cardId, cardName, targetedColumnId){
    var self = this;
    console.log(cardId);
    console.log(cardName);
    console.log(targetedColumnId);
    $.ajax({
        url: baseUrl + '/card/' + self.cardId,
        type: 'PUT',
        data: {
            name: cardName,
            bootcamp_kanban_column_id: self.targetedColumnId
        }
    });
}