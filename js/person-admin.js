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


$("#list").on("click", function (e) {
    if(e.target && e.target.nodeName.toLowerCase() == "button") {
        e.target.parentNode.parentNode.remove();
    }
})
$("#addNewItem").on("click", function () {
    var innerHTML = '<tr>'
        + '<td><input class="form-control input-sm" type="text" name="ids" placeholder="输入学号">'
        + '</td>'
        + '<td><input class="form-control input-sm" type="text" name="names" placeholder = "输入姓名"></td> '
        + '<td>'
        + '<button type="button" class="btn btn-danger btn-xs">删除</button>'
        + '</td>'
        + '</tr>';
    $("#list").html($("#list").html() +innerHTML);
})

var validator = $("#addStudent").validate({
    rules: {
        ids: {
            notSpecialString: true
        },
        names: {
            notSpecialString: true
        }
    },
    messages: {
        ids: {
            notSpecialString: "不能输入特殊字符"
        },
        names: {
            notSpecialString: "不能输入特殊字符"
        }
    }

});