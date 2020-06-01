//数据表格初始化
//表格初始化
//屏幕高度和显示条数
var height = window.screen.height - 260;
var total = parseInt(height / 30);
//表格初始化
$('#table').datagrid({
    url: '/role/getMenuRole',
    pagination: true,
    singleSelect:true,
    pageSize: total,
    pageList: [total, total * 2, total * 3],
    columns: [[
        {field: 'cx', checkbox: true},
        {field: 'rid', title: '角色ID', width: "10%"},
        {field: 'rname', title: '角色名', width: "15%"},
        {field: 'name', title: '角色成员信息', width: "23%"},
        {field: 'rdesc', title: '描述', width: "20%"},
        {field: 'title', title: '菜单名称', width: "30%"},
    ]]
});

$("#add").linkbutton({
    iconCls:'icon-add'
});
var rid=null;
$("#add").click(function(){
   var rows = $('#table').datagrid('getSelections');
   var mid=[];
   if(rows.length>0){
       if(rows[0].mid!=null){
           mid = rows[0].mid.split(",");
       }
       rid=rows[0].rid;
       $("#table-menu").treegrid('clearChecked');
       $("#add-div").dialog('open');
       var getRows=$("#table-menu").treegrid('getData');
       if(mid.length>0){
           for(var i = 0;i<getRows.length;i++){
               /*for(let j=0;j<mid.length;j++){
                   if(mid[j]==getRows[i].mid){
                       getRows[i].checkState="checked";
                       getRows[i].checked=true;
                   }
               }*/
               for(var k =0;k<getRows[i].children.length;k++){
                   for(let j=0;j<mid.length;j++){
                       if(mid[j]==getRows[i].children[k].mid){
                           getRows[i].children[k].checkState="checked";
                           getRows[i].children[k].checked=true;
                       }
                   }
               }
               $("#table-menu").treegrid('loadData',getRows);
           }
       }else{
           $("#table-menu").treegrid('clearChecked');
       }
       $("#table-menu").treegrid('reload');
   }else{
       $.messager.alert('提示','请选择数据在操作！');
   }
});

$("#add-div").dialog({
    iconCls: 'icon-save',
    title:'角色授权',
    width:500,
    height:400,
    closed:true,
    buttons:[{
        text:'保存',
        iconCls:'icon-save',
        handler:function(){
            var rows = $("#table-menu").treegrid('getCheckedNodes');
            var mids=[];
            for(var i =0;i<rows.length;i++){
                if(rows[i].fid!=null && rows[i].fid!=""){
                    mids.push(rows[i].fid);
                }
                mids.push(rows[i].mid);
            }
            var json = JSON.stringify(mids);
            $.post('/role/menuRole',{"role_id":rid,"mid":json},function(data){
                if(data.flag){
                    $.messager.alert('授权','授权成功');
                    $("#add-div").dialog('close');
                    $("#table-menu").treegrid('reload');
                    $('#table').datagrid('reload');
                }else{
                    $.messager.alert('授权','授权失败');
                }
            },'json');

        }
    }]
});

$("#table-menu").treegrid({
    url:'/getMenuTree',
    idField:'mid',
    checkbox: true,
    treeField:'title',
    showHeader:false,
    columns:[[
        {field:'title',title:'',width:'100%'},
    ]]
});