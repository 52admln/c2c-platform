var validator = $("#signforStudent").validate({
    rules: {
        username: {
            isUserName: true,
            required: true,
            minlength: 2,
            maxlength: 16
        },
        password: {
            required: true,
            minlength: 6,
            maxlength: 25
        },
        email: {
            required: true,
            email: true
        },
        sid: {
            required: true,
            number: true
        },
        confirm_password: {
            required: true,
            minlength: 6,
            maxlength: 25,
            equalTo: "#password1"
        }
    },
    messages: {
        username: {
            required: "请输入用户名",
            isUserName: "请输入以字母开头的字母数字，可包含'_'符号",
            minlength: "用户名必需由 2 个字母组成",
            maxlength: "用户名最长不得超过 16 个字符"
        },
        email: "请输入一个正确的邮箱",
        password: {
            required: "请输入密码",
            minlength: "密码长度不能小于 6 个字母",
            maxlength: "密码长度不能小于 25 个字母"
        },
        confirm_password: {
            required: "请输入密码",
            minlength: "密码长度不能小于 6 个字母",
            maxlength: "密码长度不能大于 25 个字母",
            equalTo: "两次密码输入不一致"
        },
        sid: {
            number: "请输入正确学号"
        }
    }
});

var validator = $("#signforNomal").validate({
    rules: {
        username: {
            isUserName: true,
            required: true,
            minlength: 2,
            maxlength: 16
        },
        email: {
            required: true,
            email: true
        },
        password: {
            required: true,
            minlength: 6,
            maxlength: 25
        },
        confirm_password: {
            required: true,
            minlength: 6,
            maxlength: 25,
            equalTo: "#password"
        }
    },
    messages: {
        username: {
            required: "请输入用户名",
            isUserName: "请输入以字母开头的字母数字，可包含'_'符号",
            minlength: "用户名必需由 2 个字母组成",
            maxlength: "用户名最长不得超过 16 个字符"
        },
        email: "请输入一个正确的邮箱",
        password: {
            required: "请输入密码",
            minlength: "密码长度不能小于 6 个字母",
            maxlength: "密码长度不能小于 25 个字母"
        },
        confirm_password: {
            required: "请输入密码",
            minlength: "密码长度不能小于 6 个字母",
            maxlength: "密码长度不能大于 25 个字母",
            equalTo: "两次密码输入不一致"
        }
    }
});

$("input[type=reset]").click(function () {
    validator.resetForm();
});


$("input[name=usertype]").on("change", function (e) {
    console.log($(this).val());
    switch ($(this).val()) {
        case "0":
            $(".form-signin").eq(0).removeClass("hidden").siblings(".form-signin").addClass("hidden");
            break;
        case "1":
            $(".form-signin").eq(1).removeClass("hidden").siblings(".form-signin").addClass("hidden");
            break;


    }
})