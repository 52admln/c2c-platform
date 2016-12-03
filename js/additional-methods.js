jQuery.validator.addMethod("isUserName", function (value, element) {
    return this.optional(element) || /^[a-zA-z][a-zA-Z0-9_]{1,17}$/.test(value);
});
