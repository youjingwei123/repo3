//图标加载
$("#add").linkbutton({
    iconCls: 'icon-add'
});
$("#update").linkbutton({
    iconCls: 'icon-edit'
});
$("#remove").linkbutton({
    iconCls: 'icon-remove'
});
$("#search").linkbutton({
    iconCls: 'icon-search'
});
$("#add-sex").radiobutton({
    checked:true
});
//按钮事件
$("#add").click(function () {
    $("#add-user").form('clear');
    $("#add-accountNonExpired").checkbox({checked: true});
    $("#add-enabled").checkbox({checked: true});
    $("#add-user-div").dialog('open');
});
$("#update").click(function () {
    var row = $('#table').datagrid('getSelected');
    if (row != null) {
        $("#update-user").form('load', row);
        $("#update-password").passwordbox('setValue', "");
        $("#update-username").textbox({
            readonly:true
        });
        $("#update-user-div").dialog('open');
    } else {
        $.messager.alert('提示', "请选择数据再进行操作！");
    }
});
$("#search").click(function(){
    var search_data=serializeToObject($("#search-form").serializeArray());
    for(var i in search_data){
        if(search_data[i] == "" || search_data[i] == null){
            delete search_data[i]
        }
    }
    $("#table").datagrid('load',search_data);
});
$("#remove").click(function (data) {
    var rows = $("#table").datagrid('getSelections');
    if (rows.length>0) {
        $.messager.confirm('确认', '您确认想要删除记录吗？', function (r) {
            if (r) {
                var user_list = []
                for (let i = 0; i < rows.length; i++) {
                    user_list.push(rows[i].username);
                }
                var json=JSON.stringify(user_list);
                $.post('/user/removeUser',{'json':json},function(data){
                    if(data.flag){
                        $.messager.alert('删除', '删除成功！');
                        $("#table").datagrid('reload');
                    }else{
                        $.messager.alert('删除', '删除失败！');
                    }
                },'json');
            }
        });
    } else {
        $.messager.alert('提示', '请选择数据在操作！');
    }
});
//屏幕高度和显示条数
var height = window.screen.height - 260;
var total = parseInt(height / 30);
//表格初始化
$('#table').datagrid({
    url: '/user/getUser',
    pagination: true,
    pageSize: total,
    pageList: [total, total * 2, total * 3],
    columns: [[
        {field: 'cx', checkbox: true},
        {field: 'username', title: '用户名', width: "10%", align: 'left'},
        {field: 'name', title: '姓名', width: "10%", align: 'left'},
        {field: 'sex', title: '性别', width: "5%", align: 'center'},
        {field: 'email', title: '邮箱', width: "12%", align: 'left'},
        {field: 'phone', title: '电话', width: "12%", align: 'center'},
        {field: 'qq', title: 'QQ', width: "13%", align: 'left'},
        {field: 'weChat', title: '微信', width: "13%", align: 'left'},
        {
            field: 'accountNonExpired',
            title: '是否有效',
            width: "6%",
            align: 'center',
            formatter: function (value, row, index) {
                if (value) {
                    return "是";
                } else {
                    return "否";
                }
            }
        },
        {
            field: 'accountNonLocked',
            title: '是否锁定',
            width: "6%",
            align: 'center',
            formatter: function (value, row, index) {
                if (value) {
                    return "否";
                } else {
                    return "是";
                }
            }
        },
        {
            field: 'credentialsNonExpired',
            title: '是否到期',
            width: "6%",
            align: 'center',
            formatter: function (value, row, index) {
                if (value) {
                    return "否";
                } else {
                    return "是";
                }
            }
        },
        {
            field: 'enabled', title: '是否启用', width: "6%", align: 'center', formatter: function (value, row, index) {
                if (value) {
                    return "是";
                } else {
                    return "否";
                }
            }
        }
    ]]
});

//新增对话框
$("#add-user-div").dialog({
    width: 550,
    height: 350,
    title: '新增用户',
    iconCls: 'icon-save',
    closed: true,
    buttons: [{
        text: "保存",
        iconCls: 'icon-save',
        handler: function () {
            var json = serializeToObject($("#add-user").serializeArray());
            if (json.accountNonLocked == null || json.accountNonLocked == "") {
                json.accountNonLocked = "true";
            }
            if (json.credentialsNonExpired == null || json.credentialsNonExpired == "") {
                json.credentialsNonExpired = "true";
            }
            if($("#add-user").form('validate')){
                $.post("/user/addUser", json, function (data) {
                    if (data.flag) {
                        $.messager.alert('保存', data.msg);
                        $('#table').datagrid('reload');
                        $("#add-user-div").dialog('close');
                    } else {
                        $.messager.alert('保存', "添加失败");
                    }
                }, "json");
            }else{
                $.messager.alert('保存', "数据无效");
            }
        }
    }]

});
//修改对话框
$("#update-user-div").dialog({
    width: 550,
    height: 350,
    title: '修改用户',
    iconCls: 'icon-save',
    closed: true,
    buttons: [{
        text: "保存",
        iconCls: 'icon-save',
        handler: function () {
            if($("#update-user").form('validate')){
                $.messager.confirm('确认', '您确认想要修改当前记录吗？', function (r) {
                    if (r) {
                        var json = serializeToObject($("#update-user").serializeArray());
                        if (json.accountNonLocked == null || json.accountNonLocked == "") {
                            json.accountNonLocked = "true";
                        }
                        if (json.credentialsNonExpired == null || json.credentialsNonExpired == "") {
                            json.credentialsNonExpired = "true";
                        }
                        $.post("/user/updateUser", json, function (data) {
                            if (data.flag) {
                                $.messager.alert('保存', data.msg);
                                $('#table').datagrid('reload');
                                $("#update-user-div").dialog('close');
                            } else {
                                $.messager.alert('保存', "修改失败");
                            }
                        }, "json");
                    }
                });
            }else{
                $.messager.alert('保存', "数据无效！");
            }
        }
    }]

});

$("#search-username").textbox({
    height:26,
    fontSize:22
});
$("#search-name").textbox({
    height:26,
    fontSize:22
});

//表单验证
$.extend($.fn.validatebox.defaults.rules, {
    english: {
        validator: function(value, param){
            var e=/^[a-zA-Z0-9]{4,16}$/;
            return e.test(value);
        },
        message: '请输入英文和数字4~16位！'
    },
    phone:{
        validator: function(value, param){
            var e=/^[1][356789][0-9]{9}$/;
            return e.test(value);
        },
        message: '请输入电话号码11位！'
    },
    user:{
        validator: function(value, param){
            return false;
        },
        message: '用户名重复！'
    },
});
$("#add-username").textbox({
    required:true,
    missingMessage:'请输入用户名！',
    validType:['english']
});
$("#add-password").passwordbox({
    required:true,
    missingMessage:'请输入密码！',
});
$("#add-name").textbox({
    required:true,
    missingMessage:'请输入姓名！',
});
$("#add-phone").numberbox({
    validType:['phone']
});
$("#update-name").textbox({
    required:true,
    missingMessage:'请输入姓名！',
});
$("#update-phone").numberbox({
    validType:['phone']
});
$("#add-email").textbox({
    validType:['email']
});
$("#update-email").textbox({
    validType:['email']
});

$(function() {
    $("#add-username + span > input").focus(function () {
        if ($("#add-username").textbox('textbox').validatebox('options').validType.length > 1) {
            $("#add-username").textbox('textbox').validatebox('options').validType.splice(1, 1);
        }
    });
    $("#add-username + span > input").blur(function () {
        $.get("/user/getUserByUserName?userName=" + $("#add-username").textbox('getValue'), function (data) {
            if (data.flag) {
                $("#add-username").textbox('textbox').validatebox('options').validType.splice(1, 0, 'user');
                $("#add-username").textbox('enableValidation');
            }
        });
    });
});