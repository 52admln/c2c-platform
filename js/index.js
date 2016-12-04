$('.carousel').carousel();
$(".list-item").on("mouseover", function () {
    $(this).removeClass("list-item-hover").addClass("list-item-hover").siblings(".list-item").removeClass("list-item-hover")
});
$(".list-item").on("mouseout", function () {
    $(this).removeClass("list-item-hover").siblings(".list-item").removeClass("list-item-hover")
});