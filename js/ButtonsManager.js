

/** 
 * Buttons' filtering constructor.
 * 
 * @class ButtonsManager
 *
 * @param {ContextDataList Object} Reference to ContextDataList object in order to manage its filters.
 * @param {Array} options An object with the options for ButtonsManager component.
 * @option {string} [target='YourOwnDivId']
 *    Identifier of the DIV tag where the component should be displayed.
 */
function ButtonsManager (contextDataList, options) {
	var consts = {
	};
	var default_options_values = {        
	};
	for(var key in options){
	     this[key] = options[key];
	}
	for(var key in default_options_values){
	     this[key] = default_options_values[key];
	}
	
	for(var key in consts){
	     this[key] = consts[key];
	}
        this.contextDataList = contextDataList;
}

/**
 *      ButtonsManager class. Represents a set of filters selectable via buttons by users.
 * 
 *      @class ButtonsManager
 *      
 */
ButtonsManager.prototype = {
	constructor: ButtonsManager,
        buttons : [],
        
        
      
        /**
         * Creates buttons and draw them into the element with id 'targetId'
         */        
	buildButtons : function (){
		var target = document.getElementById(this.targetId);
		if (target == undefined || target == null){
			return;	
		}
                var databaseButton = this.createEmbossedButton('Database','database','database');
                target.appendChild(databaseButton);
                var eventsButton = this.createEmbossedButton('Events','events','Event');
                target.appendChild(eventsButton);
                var toolsButton = this.createEmbossedButton('Tools','tools','Tool');
                target.appendChild(toolsButton);
                var trainingMaterialButton = this.createEmbossedButton('Training materials','training_material','Training Material');
                target.appendChild(trainingMaterialButton);
                var workflowButton = this.createEmbossedButton('Workflow','workflow','workflow');
                target.appendChild(workflowButton);
                
		this.buttons.push(databaseButton);
                this.buttons.push(eventsButton);
                this.buttons.push(toolsButton);
                this.buttons.push(trainingMaterialButton);
                this.buttons.push(workflowButton);
                
                // mirar como se ejecuta esto para que no devuelva ningun resultado
                this.contextDataList.currentFilters = this.getPresentFiltersByButtons();
	},
        
        /**
        * Creates pressed buttons and draw them into the element with id 'targetId'
        */  
        buildPressedButtons : function (){
            this.buildButtons();
            for(var i=0;i<this.buttons.length;i++){
                if (!this.isButtonPressed(this.buttons[i])){
                    this.showButtonClick(this.buttons[i]);
                }
            }
            this.contextDataList.currentFilters = this.getPresentFiltersByButtons();

        },
        
        /**
        * Function that creates one button with 'embossed' aspect.
        * @param label {String} - Title to be used into the ANCHOR element.
        * @param internalClass {String} - Specific className to be used into the ANCHOR element.
        * @param internalName {String} - Name to be used into the ANCHOR element. It should be a filter name.
        */  
        createEmbossedButton : function(label, internalClass, internalName){
            var button = document.createElement('a');
            var linkText = document.createTextNode(label);
            button.appendChild(linkText);
            button.title = label;
            button.name = internalName;
            button.href = "#";
            var myButtonsManager = this;
            button.onclick = function (){
                myButtonsManager.filter(this);
                return false;
            }
            button.classList.add('button');
            button.classList.add('embossed');
            button.classList.add('gray');
            button.classList.add(internalClass);
            return button;    
        },
        
        /**
        * Function that changes the status of the button and executes the redrawn of the ContextDataList
        * object having into account chosen filters.
        * @param myButton {Button} - Button to be pressed/unpressed.
        */  
        filter: function (myButton){
            this.showButtonClick(myButton);
            this.contextDataList.currentFilters = this.getPresentFiltersByButtons();
            this.contextDataList.totalDrawContextDataList();
        },
        
        /**
        * Function that changes the aspect of one button from pressed to embossed, or vice versa.
        * @param myButton {Button} - Button to be pressed/unpressed.
        */ 
        showButtonClick: function (myButton){
            myButton.classList.toggle("embossed");
            myButton.classList.toggle("pressed");
        },
        
        /**
        * Function that returns if the button passed as argument is pressed or not.
        * @param myButton {Button} - Button to check its status.
        * {Boolean} - Returns if myButton is pressed or not.
        */
        isButtonPressed: function (myButton){
            if (!myButton.classList.contains("pressed")) {
                return false;
            }else return true;
        },
        
        /**
        * Function that returns active filters related with pressed buttons.
        * {Array} - Current applicable filters.
        */
        getPresentFiltersByButtons : function(){
            var pressedButtons = this.getPressedButtons();
            var filters = [];
            for(var i=0;i<pressedButtons.length;i++){
                filters.push(pressedButtons[i].name);
            }
            return filters;       
        },
        
        /**
        * Function that returns all pressed buttons.
        * {Array} - Current pressed buttons.
        */
        getPressedButtons : function(){
            var pressedButtons = [];
            for(var i=0;i<this.buttons.length;i++){
                if (this.isButtonPressed(this.buttons[i])){
                    pressedButtons.push(this.buttons[i]);
                }
            }
            return pressedButtons;
        }
}
      
      
  