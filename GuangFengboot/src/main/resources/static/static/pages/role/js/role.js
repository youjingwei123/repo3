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
$("#add-rdesc").textbox({
    height: 80,
    multiline: true
});
$("#update-rdesc").textbox({
    height: 80,
    multiline: true
});
//表格初始化
//屏幕高度和显示条数
var height = window.screen.height - 260;
var total = parseInt(height / 30);
//表格初始化
$('#table').datagrid({
    url: '/role/getRole',
    pagination: true,
    pageSize: total,
    pageList: [total, total * 2, total * 3],
    columns: [[
        {field: 'cx', checkbox: true},
        {field: 'rid', title: '角色ID', width: "15%"},
        {field: 'rname', title: '角色名', width: "15%"},
        {field: 'name', title: '角色成员信息', width: "33%"},
        {field: 'rdesc', title: '描述', width: "35%"}
    ]]
});

//按钮事件
$("#add").click(function () {
    $("#add-role-form").form('clear');
    dsSelectObj.init();
    $.post("/user/getUserGiveRole", function (data) {
        dsSelectObj.setLeftData(data, "name");
    })
    $("#add-div").dialog('open');
});
$("#search-name").textbox({
    prompt:'请输入角色名称',
    height:30
});
$("#search").click(function(){
    var json = serializeToObject($("#search-form").serializeArray());
    $('#table').datagrid('load',json);
});
//删除数据
$("#remove").click(function(){
    var rows = $("#table").datagrid('getSelections');
    if(rows.length>0){
        var remove_data=[];
        for(let i = 0;i<rows.length;i++){
            remove_data.push(rows[i].rid);
        }
        var json = JSON.stringify(remove_data);
        $.messager.confirm('确认','您确认想要删除记录吗？',function(r){
            if (r){
                $.post('/role/removeRoleAndUser',{"role_id":json},function(data){
                    if(data.flag){
                        $.messager.alert('删除', "删除成功！");
                        $('#table').datagrid('reload');
                    }else{
                        $.messager.alert('删除', "删除失败！");
                    }
                },'json');
            }
        });
    }else{
        $.messager.alert('删除', "请先选择数据！");
    }

});
$("#update").click(function () {
    var row = $('#table').datagrid('getSelected');
    if (row != null) {
        updateDsSelectObj.init();
        let datasR = [];
        $("#update-div").dialog('open');
        $("#update-role-form").form('load', row);
        if(row.username != null && row.username != "" ){
            for (let i = 0; i < row.username.split(",").length; i++) {
                var data = {
                    username: row.username.split(",")[i],
                    name: row.name.split(",")[i]
                }
                datasR.push(data);
            }
        }
        $.post("/user/getUserGiveRole", function (data) {
            for (let i = 0; i < datasR.length; i++) {
                for (let j = 0; j < data.length; j++) {
                    if (datasR[i].username == data[j].username) {
                        data.splice(j,1);
                        j--;
                    }
                }
            }
            updateDsSelectObj.setLeftData(data, "name");
        });
        updateDsSelectObj.setRightData(datasR, "name");
    } else {
        $.messager.alert('修改', "请先选择数据！");
    }
});
//新增对话框
$("#add-div").dialog({
    title: "新增角色",
    iconCls: "icon-save",
    width: 450,
    closed: true,
    height: 520,
    buttons: [{
        text: '保存',
        iconCls: 'icon-save',
        handler: function () {
            var json = serializeToObject($("#add-role-form").serializeArray());
            $.post("/role/addRole", json, function (data) {
                if (data.flag) {
                    //角色成员增加
                    if (rightValues().length > 0) {
                        var user = rightValues();
                        var user_role_list = [];
                        for (var i = 0; i < user.length; i++) {
                            user_role_list.push(user[i].username);
                        }
                        var user_role = JSON.stringify(user_role_list);
                        $.post("/role/addRoleUser", {"role_id": json.rid, "json": user_role}, function (data2) {
                            if (data2.flag) {
                                $.messager.alert('保存', "保存成功！");
                                $("#add-div").dialog('close');
                                $('#table').datagrid('reload');
                            } else {
                                $.messager.alert('保存', "角色添加成功，成员分配失败！");
                            }
                        }, "json");
                    } else {
                        $.messager.alert('保存', "角色添加成功！");
                        $("#add-div").dialog('close');
                        $('#table').datagrid('reload');
                    }
                } else {
                    $.messager.alert('保存', "角色添加失败！");
                }
            }, "json");
        }
    }]
});
$('#search-name').textbox({
    height:25
});
$("#update-rid").textbox({readonly:true});
//修改对话框
$("#update-div").dialog({
    title: "修改角色",
    iconCls: "icon-save",
    width: 450,
    closed: true,
    height: 520,
    buttons: [{
        text: '保存',
        iconCls: 'icon-save',
        handler: function () {
            $.messager.confirm('确认','您确认想要修改当前记录吗？',function(r){
                if (r){
                    var json = serializeToObject($("#update-role-form").serializeArray());
                    $.post("/role/updateRole", json, function (data) {
                        if (data.flag) {
                            //角色成员增加
                            if (updateRightValues().length > 0) {
                                var user = updateRightValues();
                                var user_role_list = [];
                                for (var i = 0; i < user.length; i++) {
                                    user_role_list.push(user[i].username);
                                }
                                var user_role = JSON.stringify(user_role_list);
                                $.post("/role/updateRoleUser", {"role_id": json.rid, "json": user_role}, function (data2) {
                                    console.log(data2);
                                    if (data2.flag) {
                                        $.messager.alert('保存', "保存成功！");
                                        $("#update-div").dialog('close');
                                        $('#table').datagrid('reload');
                                    } else {
                                        $.messager.alert('保存', "角色修改成功，成员分配失败！");
                                    }
                                }, "json");
                            } else {
                                $.post("/role/removeUserByRoleId",{"role_id":json.rid},function(data3){
                                    if(data3.flag){
                                        $.messager.alert('保存', "角色修改成功！");
                                        $("#update-div").dialog('close');
                                        $('#table').datagrid('reload');
                                    }else{
                                        $.messager.alert('保存', "修改失败！");
                                    }
                                },"json");
                            }
                        } else {
                            $.messager.alert('保存', "角色修改失败！");
                        }
                    }, "json");
                }
            });
        }
    }]
});
//左右选择框
let dsSelectObj = new dsSelect("dsSelectTemp");
dsSelectObj.multiSelect = true;

function leftValues() {
    return dsSelectObj.getSelectLeftValus();
}

function rightValues() {
    return dsSelectObj.getSelectRightValus();
}

function disableButtons() {
    dsSelectObj.disableButtons();
}

function start() {
    dsSelectObj.restartButtons();
}

//更新部分
let updateDsSelectObj = new dsSelect("left-right-input");
updateDsSelectObj.multiSelect = true;


function updateLeftValues() {
    return updateDsSelectObj.getSelectLeftValus();
}

function updateRightValues() {
    return updateDsSelectObj.getSelectRightValus();
}

$.extend($.fn.validatebox.defaults.rules, {
    role: {
        validator: function(value, param){
            return false;
        },
        message: '角色ID重复！'
    },
});
//验证
$("#add-rid").textbox({
    required:true,
    missingMessage:'请输入角色ID！',
    validType:[]
});
$("#add-rname").textbox({
    required:true,
    missingMessage:'请输入角色名称！',
});
$("#update-rname").textbox({
    required:true,
    missingMessage:'请输入角色名称！',
});

$(function() {
    $("#add-rid + span > input").focus(function () {
        if ($("#add-rid").textbox('textbox').validatebox('options').validType.length > 0) {
            $("#add-rid").textbox('textbox').validatebox('options').validType.splice(0, 1);
        }
        console.log($("#add-rid").textbox('textbox').validatebox('options').validType)
    });
    $("#add-rid + span > input").blur(function () {
        $.get("/role/getRoleById?rid=" + $("#add-rid").textbox('getValue'), function (data) {
            if (data) {
                $("#add-rid").textbox('textbox').validatebox('options').validType.splice(0, 0, 'role');
                $("#add-rid").textbox('enableValidation');
            }
            console.log($("#add-rid").textbox('textbox').validatebox('options').validType)
            console.log(data)
        });
    });
});