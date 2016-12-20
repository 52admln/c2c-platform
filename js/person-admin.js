$(".js-band").on("click", function (e) {
    $('#confirmBand').modal('show');
});
$(".js-del").on("click", function (e) {
    $('#confirmDel').modal('show');
});

var template = 1;

//删除一行
$("#list").on("click", function (e) {
    if (e.target && e.target.nodeName.toLowerCase() == "button") {
        e.target.parentNode.parentNode.remove();
        template--;
    }
});

// 新增一行
$("#addNewItem").on("click", function () {
    var innerHTML = '<tr>'
        + '<td><input class="form-control input-sm" type="text" name="ids" id="id-' + ++template + '" placeholder="输入学号">'
        + '</td>'
        + '<td><input class="form-control input-sm" type="text" name="names" id="name-' + ++template + '" placeholder="输入姓名"></td> '
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


if ($.validator) {
    //fix: when several input elements shares the same name, but has different id-ies....
    $.validator.prototype.elements = function () {
        var validator = this,
            rulesCache = {};
        // select all valid inputs inside the form (no submit or reset buttons)
        // workaround $Query([]).add until http://dev.jquery.com/ticket/2114 is solved
        return $([]).add(this.currentForm.elements)
            .filter(":input")
            .not(":submit, :reset, :image, [disabled]")
            .not(this.settings.ignore)
            .filter(function () {
                var elementIdentification = this.id || this.name;
                !elementIdentification && validator.settings.debug && window.console && console.error("%o has no id nor name assigned", this);
                // select only the first element for each name, and only those with rules specified
                if (elementIdentification in rulesCache || !validator.objectLength($(this).rules()))
                    return false;
                rulesCache[elementIdentification] = true;
                return true;
            });
    };
}

var validator = $("#addStudent").validate({
    rules: {
        ids: {
            required: true,
            number: true,
            maxlength: 14,
            notSpecialString: true
        },
        names: {
            required: true,
            notSpecialString: true
        }
    },
    messages: {
        ids: {
            required: "请填写内容。",
            number: "输入数字",
            maxlength: "最长14个数字",
            notSpecialString: "不能输入特殊字符"
        },
        names: {
            required: "请填写内容。",
            notSpecialString: "不能输入特殊字符"
        }
    },
    submitHandler: function () {
        var postStr = "";
        $("input[name=ids]").each(function (item) {
            postStr += "ids=" + $(this).val() + "&";
        });
        $("input[name=names]").each(function (item) {
            postStr += "names=" + $(this).val() + "&";
        });
        postStr = postStr.substring(0, postStr.length - 1);
        $.ajax({
            type: 'POST',
            url: "AddStudentAction",
            data: postStr,
            cache: false,
            dataType: 'json',
            success: function (data) {
                console.log(data);
                if (data == "{meesage=true}") {
                    alert("添加成功");
                } else {
                    alert("添加失败");
                }
            },
            error: function (error) {
                alert("失败,请检查网络");
                console.log(error.statusText);
            }
        })
    }
});



$("#xlsUploader").on('change', function (e) {
    var name=e.target.value;
    console.log(name);
    var fileName = name.substring(name.lastIndexOf(".")+1).toLowerCase();
    console.log(fileName);
    if(fileName !="xls"){
        alert("请选择Excel格式文件上传(xls)！");
        e.target.value="";
        return
    }
})