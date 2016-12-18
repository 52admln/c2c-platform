$(".js-band").on("click", function (e) {
    $('#confirmBand').modal('show');
});
$(".js-del").on("click", function (e) {
    $('#confirmDel').modal('show');
});

//删除一行
$("#list").on("click", function (e) {
    if (e.target && e.target.nodeName.toLowerCase() == "button") {
        e.target.parentNode.parentNode.remove();
    }
});

// 新增一行
$("#addNewItem").on("click", function () {
    var innerHTML = '<tr>'
        + '<td><input class="form-control input-sm" type="text" name="ids" maxlength="10" placeholder="输入学号" required>'
        + '</td>'
        + '<td><input class="form-control input-sm" type="text" name="names" placeholder = "输入姓名" required></td> '
        + '<td>'
        + '<button type="button" class="btn btn-danger btn-xs">删除</button>'
        + '</td>'
        + '</tr>';
    $("#list").append(innerHTML);
});


// 删除按钮
$("#studentList").on("click", function (e) {
    if (e.target && e.target.nodeName.toLowerCase() == "button") {
        var currentId = $(e.target).attr("data-id");
        console.log(currentId);
        $.ajax({
            type: 'POST',
            url: "DelStudentAction",
            data: {
                "sid": currentId
            },
            cache: false,
            dataType: 'json',
            success: function (data) {
                console.log(data);
                if (data == "{meesage=true}") {
                    alert("删除成功");
                    e.target.parentNode.parentNode.remove();
                } else {
                    alert("删除失败");
                }
            },
            error: function (error) {
                alert("删除失败,请检查网络");
                console.log(error.statusText);
            }
        });
    }
});



//渲染列表
function renderList(data) {
    var string = "";
    $.each(data, function (i, item) {
        string += '<tr>'
            + '<td>' + parseInt(i + 1) + '</td>'
            + '<td>' + item.sid + '</td>'
            + '<td>' + item.studentName + '</td>'
            + '<td>'
            + '<button type="button" class="btn btn-danger btn-xs" data-id="' + item.sid + '">删除</button>'
            + '</td>'
            + '</tr>'
    });
    $("#studentList").html(string);
}

// 表单验证
$("#addStudent").validate();
$("[name=ids]").each(function(){
    $(this).rules("add", {
        required: true,
        email: false,
        messages: {
            required: "Specify a valid email"
        }
    });
});
$("[name=names]").each(function(){
    $(this).rules("add", {
        required: true,
        email: false,
        messages: {
            required: "Specify a valid email"
        }
    });
});



// var validator = $("#addStudent").validate({
//     rules: {
//         ids: {
//             required: true,
//             notSpecialString: true
//         },
//         names: {
//             required: true,
//             notSpecialString: true
//         }
//     },
//     messages: {
//         ids: {
//             required: "请输入内容",
//             notSpecialString: "不能输入特殊字符"
//         },
//         names: {
//             required: "请输入内容",
//             notSpecialString: "不能输入特殊字符"
//         }
//     },
//     submitHandler: function() {
//         alert("Submitted!");
//         console.log($("#addStudent").serialize());
//         $.ajax({
//             type: 'POST',
//             url: "AddStudentAction",
//             data: $("#addStudent").serialize(),
//             cache: false,
//             dataType: 'json',
//             success: function (data) {
//                 console.log(data);
//                 if (data == "{meesage=true}") {
//                     alert("添加成功");
//                 } else {
//                     alert("添加失败");
//                 }
//             },
//             error: function (error) {
//                 alert("失败,请检查网络");
//                 console.log(error.statusText);
//             }
//         })
//     }
// });
var validator = $("#searchStudent").validate({
    rules: {
        searchValue: {
            required: true,
            notSpecialString: true
        }
    },
    messages: {
        searchValue: {
            required: "请填写内容。",
            notSpecialString: "不能输入特殊字符"
        }
    },
    submitHandler: function () {
        // alert("Submitted!")
        var searchType = document.forms['searchStudent'].searchType.value;
        var searchValue = document.forms['searchStudent'].searchValue.value;
        switch (searchType) {
            // sid
            case "1":
                $.ajax({
                    type: 'POST',
                    url: "SearchUserAction",
                    data: {
                        "sid": searchValue
                    },
                    cache: false,
                    dataType: 'json',
                    success: function (data) {
                        renderList(JSON.parse(data));
                    },
                    error: function (error) {
                        alert("搜索失败,请检查网络");
                        console.log(error.statusText);
                    }
                });
                break;
            // studentName
            case "2":
                $.ajax({
                    type: 'POST',
                    url: "SearchUserAction",
                    data: {
                        "studentName": searchValue
                    },
                    cache: false,
                    dataType: 'json',
                    success: function (data) {
                        renderList(JSON.parse(data));
                    },
                    error: function () {
                        alert("失败,请检查网络");
                    }
                });
                break;
        }
    }
});