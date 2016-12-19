jQuery.validator.addMethod("isUserName", function (value, element) {
    return this.optional(element) || /^[a-zA-z][a-zA-Z0-9_]{1,17}$/.test(value);
});
jQuery.validator.addMethod("notSpecialString", function (value, element) {
    return this.optional(element) || /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/.test(value);
});

jQuery.validator.addMethod("isSid", function (value, element) {
    return this.optional(element) || /^()$/.test(value);
});