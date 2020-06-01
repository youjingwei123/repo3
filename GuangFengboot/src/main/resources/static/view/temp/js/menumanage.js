/**
 * 功能：格式化是否特殊功能数据列
 * @param value
 * @param row
 * @param index
 */
function isSpecFunctionFormatter(value, row, index){
	if(value==1) {
		return  "<img src='../../css/icons/ok.png'/>";
	} 
	else if(value==0){
		return  "—";
	}
}

/**
 * 功能：格式化是否系统菜单数据列
 * @param value
 * @param row
 * @param index
 */
function isSysManageFormatter(value, row, index) {
	if(value==1){
		return  "<img src='../../css/icons/ok.png'/>";
	} 
	else if(value==0){
		return  "—";
	}
}

/**
 * 功能：格式化有效否数据列
 * @param value
 * @param row
 * @param index
 */
function isUsedFormatter(value, row, index){
	if(value==1){
		return  "<img src='../../css/icons/ok.png'/>";
	} else if(value==0){
		return  "—";
	}
}