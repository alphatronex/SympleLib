/*
 * JSMin
 * Javascript Compressor
 * http://www.crockford.com/
 * http://www.smallsharptools.com/Projects/Packer/
*/

// Source\sympleTech_Ajax.js

$.fn.sympleTech_ajaxlink=function(options){var settings=$.extend({'httpMethod':'GET','showHideLoaderMethod':function(show){},'onComplete':function(data){}},options);return this.each(function(){var href=$(this).attr('href');$(this).click(function(e){e.preventDefault();settings.showHideLoaderMethod(true);$.ajax({url:href,type:settings.httpMethod,success:function(data){settings.onComplete(data);settings.showHideLoaderMethod(false);}});});});};$.fn.sympleTech_ajaxform=function(options){var settings=$.extend({'showHideLoaderMethod':function(show){},'requiredFields':[],'requiredFieldClass':'field-required','errorMessageTarget':'','fieldErrorClass':'field-error','beforeSubmit':function(valState){},'action':$(this).attr("action"),'onComplete':function(data){}},options);var validationState={isValid:true,errorMessage:''};var checkRequiredFields=function(form){for(var i in settings.requiredFields){var rField=$(form).find('*[name="'+settings.requiredFields[i]+'"]');if($(rField).val()==""){validationState.errorMessage+="<li>"+$(rField).attr("name")+" is Required</li>";$(rField).addClass(settings.fieldErrorClass);validationState.isValid=false;}else{$(rField).removeClass(settings.fieldErrorClass);}}};return this.each(function(){for(var i=0;i<settings.requiredFields.length;i++){$(this).find('*[name="'+settings.requiredFields[i]+'"]').addClass(settings.requiredFieldClass);}
$(this).submit(function(e){e.preventDefault();settings.showHideLoaderMethod(true);settings.beforeSubmit(validationState);checkRequiredFields(this);if(validationState.isValid){$.post(settings.action,$(this).serialize(),function(data){settings.onComplete(data);settings.showHideLoaderMethod(false);});}else{$(settings.errorMessageTarget).html(validationState.errorMessage);settings.showHideLoaderMethod(false);}});});};
// Source\sympleTech_helpers.js

$.fn.disable=function(){return $(this).each(function(){$(this).attr('disabled','disabled');});};$.fn.enable=function(){return $(this).each(function(){$(this).removeAttr('disabled');});};
// Source\sympleTech_KendoGrid.js

$.fn.sympleTech_KendoGrid=function(options){var settings=$.extend({'dataSourceURL':'','exportName':'GridData','model':{id:'id',fields:{}},'columns':[],'pagesize':10,'rowSelectable':true,'onRowSelected':function(id){},'searchForm':''},options);return this.each(function(){var formParams={};if(settings.searchForm!=""){var $form=$("#"+settings.searchForm);var formData=$form.serialize().split('&');$(formData).each(function(){var nvp=this.split('=');formParams[nvp[0]]=function(){var $inputEl=$form.find('*[name='+nvp[0]+']').first();if($inputEl.attr("type")=="checkbox"){return $inputEl.is(':checked');}
return $inputEl.val();};});}
var gridDataSource=new kendo.data.DataSource({transport:{read:{url:settings.dataSourceURL,type:"POST",data:formParams}},schema:{data:function(data){return data.Items;},model:settings.model,total:function(data){return data.TotalCount;}},serverSorting:true,serverPaging:true,pageSize:settings.pagesize});var pageSizeChoices=[5,10,15];if($.inArray(settings.pagesize,pageSizeChoices)==-1){pageSizeChoices.push(settings.pagesize);pageSizeChoices.sort(function(a,b){return a-b});}
var exportUrl=settings.dataSourceURL;if(exportUrl.indexOf('?')>-1){exportUrl+="&";}else{exportUrl+="?";}
exportUrl+="export="+settings.exportName;var exportAnchor="<a href='"+exportUrl+"' target='_blank'>Export</a>";var grid=$(this).kendoGrid({dataSource:gridDataSource,pageable:{refresh:true,pageSize:settings.pagesize,pageSizes:pageSizeChoices},sortable:true,resizable:true,selectable:(settings.rowSelectable==true)?"row":"",change:function(arg){var selected=$.map(this.select(),function(item){return $(item).find('td').first().text();});settings.onRowSelected(selected[0]);},toolbar:'<div style="text-align:right">'+exportAnchor+'</div>',columns:settings.columns,dataBound:function(e){grid.find(".k-grid-header colgroup col").first().hide();grid.find(".k-grid-content colgroup col").first().hide();grid.find("thead th").first().hide();grid.find(".k-grid-content tbody tr").each(function(){$(this).find('td').first().hide();if(settings.rowSelectable==true){$(this).addClass('hoverable');}});grid.find(".k-grid-content tbody tr td").each(function(){if($(this).html()=="null"){$(this).html("");}});}});if(settings.searchForm!=""){$("#"+settings.searchForm).submit(function(e){e.preventDefault();grid.data("kendoGrid").dataSource.read();});}
return grid;});};
