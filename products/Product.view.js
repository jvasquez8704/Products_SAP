sap.ui.jsview("products.Product", {

    /** Specifies the Controller belonging to this View. 
	 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	 * @memberOf products.Product
	 */ 
    getControllerName : function() {
        return "products.Product";
    },

    /** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	 * Since the Controller is given to this method, its event handlers can be attached right away. 
	 * @memberOf products.Product
	 */ 
    createContent : function(oController) {

        var oMatrix = sap.ui.commons.layout.MatrixLayout({
            layoutFixed:true,
            width:"300px",
            columns:3
        });

        oMatrix.createRow(
            new sap.ui.commons.Button({
                text:"Create",
                width:"100px",
                press:function(){
                    oController.create();
                }
            }),
            new sap.ui.commons.Button({
                text:"Edit",
                width:"100px",
                press:function(){
                    oController.edit();
                }
            }),
            new sap.ui.commons.Button({
                text:"Delete",
                width:"100px",
                press:function(){
                    oController.remove();
                }
            })		

        );
        var oLayout = new sap.ui.layout.form.SimpleForm("formId", {
            title:"Product Maintenance",
            content:[new sap.ui.commons.Label({text:"ID"}),
                    // new sap.ui.commons.TextField("id",{width:"200px",editable:false,change:function(r){alert(r);}}),
                     new sap.ui.commons.TextField("id",{width:"200px",change:function(r){oController.read(this.getValue());}}),                    

                     new sap.ui.commons.Label({text:"Name"}),
                     new sap.ui.commons.TextField("name",{width:"200px"}),

                     new sap.ui.commons.Label({text:"Description"}),
                     new sap.ui.commons.TextField("description",{width:"200px"}),

                     new sap.ui.commons.Label({text:"Price"}),
                     new sap.ui.commons.TextField("price",{width:"200px"}),

                     new sap.ui.commons.Label({text:"Rating"}),
                     new sap.ui.commons.TextField("rating",{width:"200px"}), 

                     new sap.ui.commons.Label({text:"Release Date"}),
                     new sap.ui.commons.TextField("date",{width:"200px",value:"1992-01-01T00:00:00"}),
//vax.herokuapp.com
                     new sap.ui.commons.Label({text:""}),
                     new sap.ui.commons.Button({
                         text:"Save",
                         width:"100px",
                         press:function(){
                             oController.save();
                         }
                     })
                    ]
        });

        //table
        var oTable = new sap.ui.table.Table("tableId",{
            visibleRowCount:5,
            editable:false
        });

        oTable.addColumn(new sap.ui.table.Column({
            label:new sap.ui.commons.Label({text:"ID"}),
            visible:true,
            //template: new sap.ui.commons.TextView({text:"{products>ID}"}) 	
            template: new sap.ui.commons.TextView({text:"{id}"}) 	
        }));
        oTable.addColumn(new sap.ui.table.Column({
            label:new sap.ui.commons.Label({text:"Nombre"}),
            visible:true,
            //template: new sap.ui.commons.TextView({text:"{products>Name}"}) 	
            template: new sap.ui.commons.TextView({text:"{Name}"}) 
        }));
        oTable.addColumn(new sap.ui.table.Column({
            label:new sap.ui.commons.Label({text:"Descrición"}),
            visible:true,
            //template: new sap.ui.commons.TextView({text:"{products>Description}"}) 
            template: new sap.ui.commons.TextView({text:"{Description}"}) 
        }));		
        //oTable.bindRows("products>Products");
        oController.getTable(oTable);
        oController.loadDataTable(oTable);

        element = [oMatrix,oTable,oLayout];
        return element;

    }

});
