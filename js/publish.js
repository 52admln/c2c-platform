$("#fileupload").on('change', function (e) {
    var name=e.target.value;
    console.log(name);
    var fileName = name.substring(name.lastIndexOf(".")+1).toLowerCase();
    console.log(fileName);
    if(fileName !="jpg" && fileName !="jpeg" && fileName !="png" && fileName !="gif" ){
        alert("请选择图片格式文件上传(jpg,png,gif等)！");
        e.target.value="";
        return
    }
})