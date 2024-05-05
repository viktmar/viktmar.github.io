
document.addEventListener('DOMContentLoaded', function() {
    var collapsibleButtons = document.querySelectorAll('.collapsible');
    
    collapsibleButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            var content = this.closest('.publication').querySelector('.content');
            if (content.style.maxHeight){
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            } 
        });
    });
});
