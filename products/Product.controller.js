
sap.ui.controller("products.Product", {
    /**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf products.Product
*/ mode:0,
    urlService:"http://138.197.87.140:1337/products/",
    tableProduct:null,
    oThis:null,
    onInit : function() {       
      oThis = this;
    },
    
    /**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf products.Product
*/
    //	onBeforeRendering: function() {
    //
    //	},

    /**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf products.Product
*/
    onAfterRendering: function() {
        $("#formId").hide();
    },

    /**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf products.Product
*/
    //	onExit: function() {
    //
    //	}
    resetForm:function(){
        $("#name").val("");
        $("#description").val("");
        $("#date").val("");		
        $("#rating").val("");
        $("#price").val("");
    },
    refresh:function(){
        var oModel = new sap.ui.model.json.JSONModel();  
        $.ajax({
            url:this.urlService,
            type:"get",            
            success:function(data){
                var d = {products:data};                
                oModel.setData({modelData:d});
                sap.ui.getCore().setModel(oModel);                
               // this.tableProduct.bindRows("/modelData/products"); // with our service	
            }
        });	
    },
    create:function(){
        this.mode = "create";
        this.resetForm();

        $("#formId").slideDown(300,function(){
            var id = sap.ui.getCore().byId("tableId")._getRowCount();
            $("#id").val(id+1);
        });
    },
    edit:function(){
        this.mode = "edit";
        $("#formId").slideDown(300,function(){
            $("#id").removeAttr("readonly");
        $("#id").attr("placeholder","Seleccione ID");  
        });
        //var inputId = sap.ui.getCore().byId("id").editable = true;            
       },
    remove:function(){       
       // $("#formId").show();
        this.mode = "remove";
        $("#formId").slideDown(300,function(){
            $("#id").removeAttr("readonly");
        $("#id").attr("placeholder","Seleccione ID");  
        });
    },
      read:function(id){       
      if(id!=""){
        $.get(this.urlService+id,function(data){
        $("#name").val(data.Name);
        $("#description").val(data.Description);
        $("#date").val(data.ReleaseDate);		
        $("#rating").val(data.Rating);
        $("#price").val(data.Price);
        console.log(data);
       });
      }
         
          
    },
    save:function(){   
        var uri = "";
        var id = $('#id').val();
		var newData = {			
			//"ID": $("#id").val(),
			"Name": $("#name").val(),
			"Description": $("#description").val(),
			"ReleaseDate": $("#date").val(),			
			"Rating": $("#rating").val(),
			"Price": $("#price").val()
		};
		if(this.mode == "create"){
			uri = this.urlService+"create/";		
        }	
        if(this.mode == "edit"){
            uri = this.urlService+"update/"+id+"/";
        }
        if(this.mode == "remove"){
            uri = this.urlService+"destroy/"+id;
        }
		$.get(uri,newData).done(function(data){
			//here it should has a method refresh
            oThis.refresh();
            oThis.resetForm();
			$("#formId").slideUp();
		}).error(function(r,e){
            oThis.errorService("No se guardaron tus cambios \n Error al conectarse al servicio");
            console.log("No se guardaron tus cambios \n Error al conectarse al servicio");
            console.log(r,e);
        });
    },
    getTable(table){
        this.TableProduct = table;
    },
    loadDataTable:function(oTable){
        var oModel = new sap.ui.model.json.JSONModel();       
        var url_ = this.urlService;
        $.ajax({
            url:url_,
            type:"get",            
            success:function(data){
                var d = {products:data};                
                oModel.setData({modelData:d});
                sap.ui.getCore().setModel(oModel);                
                oTable.bindRows("/modelData/products"); // with our service	
            },
            error:function(r,e){
                console.log("error on service");
                console.log(r,e);
                oThis.errorService("Error al conectarse al servicio");
            }
        });	
    },
    errorService:function(message){
        sap.ui.commons.MessageBox.alert(message);
    }
});