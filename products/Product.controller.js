sap.ui.controller("products.Product", {

    /**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf products.Product
*/ mode:0,
    onInit : function() {
        /* try{
            var oModel = new sap.ui.model.odata.v2.ODataModel(						
                //"proxy/http/services.odata.org/V3/(S(x0u2y1puhyzoqqgaohheug2h))/OData/OData.svc/");										
            oModel.oHeaders = {
                "DataServiceVersion" : "3.0",
                "MaxDataServiceVersion" : "3.0"
            }						
            sap.ui.getCore().setModel(oModel,"products");
        }
        catch(ex) {
            alert(ex);
        }
        finally {
            // Do nothing here!
            console.log(oModel.getData());
            console.log("paso");
        }*/

        //var oModel = new sap.ui.model.json.JSONModel();
        //oModel.loadData('http://localhost:1337/products/');
        //console.log(oModel.oData);
        //sap.ui.getCore().setModel(oModel,"products");

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

    },
    create:function(){
        this.mode = "create";
        this.resetForm();

        $("#formId").slideDown(300,function(){
            var id = sap.ui.getCore().byId("tableId")._getRowCount();
            $("#id").val(id);
        });
    },
    edit:function(){		
        $("#formId").show();
    },
    remove:function(){
        $("#formId").show();
    },
    save:function(){
        /*var requestObj = {
				requestUri:"",
				method:"",
				headers:{
					"X-Requested-Width":"XMLHttpRequest",
					"Content-Type":"application/json;odata=mininalmetadata",
					"DataServiceVersion":"3.0",
					"MaxDataServiceVersion":"3.0",
					"Accept":"application/json;odata=mininalmetadata"
				}
		};
		var newData = {
			"odata.type":"ODataDemo.Product",
			"ID": $("#id").val(),
			"Name": $("#name").val(),
			"Description": $("#description").val(),
			"ReleaseDate": $("#date").val(),			
			"Rating": $("#rating").val(),
			"Price": $("#price").val()
		};
		if(this.mode == "create"){
			var uri = "proxy/http/services.odata.org/V3/(S(ap1llhf1xx2nrvytpamq0t4f))/OData/OData.svc";
			var method = "POST";
			requestObj.requestUri = uri;
			requestObj.method = method;
			requestObj.data = newData;
		}	
		console.log(requestObj);

		OData.request(requestObj,function(){
			sap.ui.getCore().getModel("products").refresh();
			$("#formId").slideUp();
		});*/
    },
    loadData:function(){
        // $.ajax('http://localhost:1337/products/', {
         $.ajax('http://138.197.87.140:1337/products/', {
        method: 'GET'
    }).then(function(data) {
        console.log(data);
    });
    },
    loadDataTable:function(oTable){
        var oModel = new sap.ui.model.json.JSONModel();
        //El valor de esta variable debe ser ocultada
        //var url_ = "http://services.odata.org/V3/(S(ap1llhf1xx2nrvytpamq0t4f))/OData/OData.svc/Products?$format=json";
        var url_ = "http://138.197.87.140:1337/products/";
        $.ajax({
            url:url_,
            type:"get",
            data:"",
            //crossDomain: true,
            dataType: 'jsonp',
            //data:{request:true},
            success:function(data){
                console.log(data);
                oModel.setData({modelData:data});
                sap.ui.getCore().setModel(oModel);
                //sap.ui.getCore().setModel(oModel.getJSON());					
                // oTable.setModel(oModel);// with oData service
                oTable.bindRows("/modelData/"); // with our service	
            },
            error:function(r){
            console.log("entro a error");
            console.log(r);
        }
               });	
    },
    loadData2:function(table){
        var oModel = new sap.ui.model.json.JSONModel();
        var url_ = "http://services.odata.org/V3/(S(ap1llhf1xx2nrvytpamq0t4f))/OData/OData.svc/Products?$format=json";
        $.ajax({
            url:url_,
            type:"get",
            data:{request:true},
            success:function(data){			
                var h = $("#tableId").children().first()[0];
                var r = $(h).children()[1];

                console.log(r);
                console.log(data.value);
            }
        });	
    }

});