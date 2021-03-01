/**
 * Created by Administrator on 2017/6/26.
 */
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
function setDate(id){
    $('#'+id).datetimepicker({
        language: 'zh-CN',
        minView: "hour",
        format: 'yyyy-mm-dd hh:ii',
        autoclose:true
    });
}
$(document).on('click', '[data-toggle="myModal"]',
    function(e) {
        e.preventDefault();
        var $this = $(this)
            , $remote = $this.data('remote') || $this.attr('href');
        if($this.attr("disabled") == "disabled"){
            return ;
        }
        $("#myModal").load($remote,function(){
            $("#myModal").modal();
        });
    }
);
$(document).on("click",'[data-toggle="del"]',function(e){
        e.preventDefault();
        var me=this;
        if($(this).attr("data-confirm")=="yes"){
            swal({
                title: "是否确定删除?",
                text: "",
                type: "warning",
                showLoaderOnConfirm: true,
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "删除",
                cancelButtonText: "取消",
                closeOnConfirm: true,
                closeOnCancel: true
            }, function (isConfirm) {
                if (isConfirm) {
                    $.post($(me).attr("data-href"),{id:$(me).attr("data-id")},function (datas) {
                        if (datas.status == 1) {
                            toastr.success("删除成功");
                            $('.table').bootstrapTable('refresh');
                        }else{
                            swal(datas.msg);
                        }
                    });
                }
            });
        }
})
$(document).on("click",'[data-toggle="status"]',function(e){
    e.preventDefault();
    var me = this;
    var value = $(me).attr("data-value");
    var data = {
        id:$(me).attr("data-id"),
        status:value == 1?0:1
    };
    $.ajax({
        type:"post",
        url:$(me).attr("href"),
        data:data,
        success:function(res){
            if(res&&res.status == 1){
                if(value == 0){
                    $(me).html("<i class='fa fa-check text-success'></i>");
                }else if(value == 1){
                    $(me).html("<i class='fa fa-times text-error'></i>");
                }
                $(me).attr("data-value",value == 1?0:1);
                toastr.success(res.msg);
            }else{
                toastr.warning(res.msg);
            }
        },
        timeout:5000,
        error:function(res){
            toastr.warning(res);
        }
    })
})
$(document).on("click",'[data-toggle="dstatus"]',function(e){
    e.preventDefault();
    var me = this;
    var value = $(me).attr("data-value");
    var data = {
        id:$(me).attr("data-id"),
        status:value == 1?0:1
    };
    $.ajax({
        type:"post",
        url:$(me).attr("href"),
        data:data,
        success:function(res){
            if(res&&res.status == 1){
                if(value == 0){
                    $(me).html("有效("+1+")");
                }else if(value == 1){
                    $(me).html("无效("+0+")");
                }
                $(me).attr("data-value",value == 1?0:1);
                toastr.success(res.msg);
            }else{
                toastr.warning(res.msg);
            }
        },
        timeout:5000,
        error:function(res){
            toastr.warning(res);
        }
    })
})
$(document).on("click",'[data-toggle="env"]',function(e){
    e.preventDefault();
    var me = this;
    var value = $(me).attr("data-value");
    var data = {
        env:value
    };
    $.ajax({
        type:"post",
        url:$(me).attr("href"),
        data:data,
        success:function(res){
            if(res&&res.status == 1){
                $("#environment").html("&nbsp;&nbsp;"+$(me).text());
                toastr.success(res.msg);
                setTimeout(function(){
                    window.location.reload();
                },2000)
            }else{
                toastr.warning(res.msg);
            }
        },
        timeout:5000,
        error:function(res){
            toastr.warning(res);
        }
    })
})
function deleteByID(url,data) {
    swal({
        title: "是否确定删除?",
        text: "",
        type: "warning",
        showLoaderOnConfirm: true,
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {
            $.post(url,data,function (datas) {
                if (datas.flag == 0) {
                    swal("删除成功", "", "success");
                    $('.table').bootstrapTable('refresh');
                }else{
                    swal(datas.msg);
                }
            });
        } else {
            swal("取消", "操作已被取消", "error");
        }
    });
}
