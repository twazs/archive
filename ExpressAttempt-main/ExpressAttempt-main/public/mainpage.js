// Main page animation trigger 
function resize(event) {
    var cards = document.getElementsByClassName("card")
    var count = 0
    while (cards[count]) {
        if (cards[count].isPartiallyVisible(5) || cards[count].isVisible()) {
            cards[count].style.animation = "2s slide-up"
            cards[count].style.marginTop = "0%";
        } else {}
        count++;
    }
}
var cards = document.getElementsByClassName("card-text")
var count = 0
while (cards[count]) {
    if (cards[count].innerHTML.length > 120) {
        cards[count].innerHTML = cards[count].innerHTML.substr(0, 100) + "..."
    }
    count++;
}
document.addEventListener("resize", resize)
document.addEventListener("scroll", resize)