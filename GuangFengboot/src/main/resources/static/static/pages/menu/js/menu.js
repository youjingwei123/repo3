//数据表格初始化
$("#table").treegrid({
    url:'/getMenuTree',
    idField:'mid',
    treeField:'title',
    onClickRow:function(row){
        if(row.state == "closed"){
            $("#table").treegrid("expand",row.mid);
            row.state = 'open';
        }else{
            $("#table").treegrid("collapse",row.mid);
            row.state = 'closed';
        }
    },
    columns:[[
        {field:'title',title:'菜单名称',width:"30%"},
        {field:'href',title:'菜单url',width:'40%'},
        {field:'icon',title:'菜单图标',width:'20%'},
        {field:'sys',title:'是否系统菜单',width:'10%'}
    ]]
});
//按钮图标管理
$("#add-first").linkbutton({
    iconCls:'icon-add'
});
$("#add-latter").linkbutton({
    iconCls:'icon-add'
});
$("#update").linkbutton({
    iconCls:'icon-edit'
});
$("#remove").linkbutton({
    iconCls:'icon-remove'
});
//按钮事件
$("#add-first").click(function(){
    $("#add-first-form").form('clear');
    $("#add-div").dialog('open');
});
$("#add-latter").click(function(){
    $("#add-child-form").form('clear');
    var row = $("#table").treegrid('getSelected');
    if(row != null){
        $("#fid").val(row.mid);
        $("#add-child-div").dialog('open');
    }else{
        $.messager.alert('提示',"请先选择需要增加子级的菜单");
    }
});
$("#update").click(function(){
    var row = $("#table").treegrid('getSelected');
  /*  $("#update-title").textbox("readonly",true);*/
    if(row != null){
        $("#update-form").form('load',row);
        $("#mid").val(row.mid);
        $("#update-div").dialog('open');
    }else{
        $.messager.alert('提示',"请先先选择数据");
    }
});
$("#remove").click(function(){
    var row = $("#table").treegrid('getSelected');
    if(row != null){
        if(row.children.length == 0){
            if(row.sys=="" || row.sys == null){
                $.messager.confirm('确认','您确认想要删除当前记录吗？',function(r){
                    if (r){
                        $.get("/removeMenu?mid="+row.mid,function(data){
                            if(data.flag){
                                $.messager.alert('删除',data.msg);
                                $("#table").treegrid('reload');
                            }else{
                                $.messager.alert('删除',"删除失败！");
                            }
                        },"json");
                    }
                });
            }else{
                $.messager.alert('提示',"系统菜单无法删除！");
            }
        }else{
            $.messager.alert('提示',"请先删除子菜单！");
        }
    }else{
        $.messager.alert('提示',"请先选择需要删除的菜单，按级删除！");
    }
});
//一级菜单新增对话框
$("#add-div").dialog({
    width:380,
    height:290,
    iconCls:'icon-save',
    closed:true,
    title:'新增菜单',
    buttons:[{
        text:'保存',
        iconCls:'icon-save',
        handler:function(){
            var json = serializeToObject($("#add-first-form").serializeArray());
            $.post("/addMenu",json,function(data){
                if(data.flag){
                    $("#table").treegrid('reload');
                    $.messager.alert('保存',data.msg);
                    $("#add-div").dialog('close');
                }else{
                    $.messager.alert('保存',"增加失败");
                }
            },"json");
        }
    }]
});
//子菜单新增对话框
$("#add-child-div").dialog({
    width:380,
    height:290,
    iconCls:'icon-save',
    closed:true,
    title:'新增菜单',
    buttons:[{
        text:'保存',
        iconCls:'icon-save',
        handler:function(){
            var json = serializeToObject($("#add-child-form").serializeArray());
            $.post("/addMenu",json,function(data){
                if(data.flag){
                    $("#table").treegrid('reload');
                    $.messager.alert('保存',data.msg);
                    $("#add-child-div").dialog('close');
                }else{
                    $.messager.alert('保存',"增加失败");
                }
            },"json");
        }
    }]
});
//修改对话框
$("#update-div").dialog({
    width:380,
    height:290,
    iconCls:'icon-save',
    closed:true,
    title:'新增菜单',
    buttons:[{
        text:'保存',
        iconCls:'icon-save',
        handler:function(){
            var json = serializeToObject($("#update-form").serializeArray());
            $.messager.confirm('确认','您确认想要更新当前内容吗？',function(r){
                if (r){
                    $.post("/updateMenu",json,function(data){
                        if(data.flag){
                            $("#table").treegrid('reload');
                            $.messager.alert('保存',data.msg);
                            $("#update-div").dialog('close');
                        }else{
                            $.messager.alert('保存',"更新失败");
                        }
                    },"json");
                }
            });
        }
    }]
});
//表单验证
$.extend($.fn.validatebox.defaults.rules, {
    title: {
        validator: function(value, param){
            return false;
        },
        message: '已存在类似的菜单！'
    }
});
$("#add-title").textbox({
    required:true,
    missingMessage:'请输入菜单标题',
});
$("#add-child-title").textbox({
    required:true,
    missingMessage:'请输入菜单标题',
});
$("#update-title").textbox({
    required:true,
    missingMessage:'请输入菜单标题',
});

/*$(function() {
    $("#add-title + span > input").focus(function(){
        if($("#add-title").textbox('textbox').validatebox('options').validType.length>0){
            $("#add-title").textbox('textbox').validatebox('options').validType.splice(0,1);
        }
    });
    $("#add-title + span > input").blur(function () {
        $.get("/getMenuByTitle?title="+$("#add-title").textbox('getValue'),function(data){
            if(data){
                $("#add-title").textbox('textbox').validatebox('options').validType.splice(0,1,'title');
                $("#add-title").textbox('enableValidation');
            }
        });
    });
    $("#add-child-title + span > input").focus(function(){
        if($("#add-child-title").textbox('textbox').validatebox('options').validType.length>0){
            $("#add-child-title").textbox('textbox').validatebox('options').validType.splice(0,1);
        }
    });
    $("#add-child-title + span > input").blur(function () {
        $.get("/getMenuByTitle?title="+$("#add-child-title").textbox('getValue'),function(data){
            if(data){
                $("#add-child-title").textbox('textbox').validatebox('options').validType.splice(0,1,'title');
                $("#add-child-title").textbox('enableValidation');
            }
        });
    });
});*/
