/**
 * Created by Wyj on 16/12/6.
 */




$('#myModal').on('hidden.bs.modal', function (e) {
    // do something...
});


$(".js-band").on("click", function (e) {
    $('#confirmBand').modal('show');
})
$(".js-del").on("click", function (e) {
    $('#confirmDel').modal('show');
})