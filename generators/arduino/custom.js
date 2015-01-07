/**
 * @fileoverview Helper functions for generating Arduino blocks.
 * @author author@email.com (Name)
 */
'use strict';

//define blocks
if (!Blockly.Language) Blockly.Language = {};

//define read block
Blockly.Language.custom_read = {
  category: 'Custom',
  helpUrl: '',
  init: function() {
    this.setColour(230);
	this.appendDummyInput("")
	    .appendTitle("CustomRead PIN#")
	    .appendTitle(new Blockly.FieldDropdown(profile.default.digital), "PIN");
    this.setOutput(true, Boolean);
    this.setTooltip('input block');
  }
};

//define write block
Blockly.Language.custom_write = {
  category: 'Custom',
  helpUrl: '',
  init: function() {
    this.setColour(230);
	this.appendDummyInput("")
	    .appendTitle("CustomWrite PIN#")
	    .appendTitle(new Blockly.FieldImage("http://www.seeedstudio.com/wiki/images/thumb/e/e0/LED1.jpg/400px-LED1.jpg", 64, 64))
	    .appendTitle(new Blockly.FieldDropdown(profile.default.analog), "PIN")
	    .appendTitle("value");
	this.appendValueInput("NUM", Number);
	this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Output block');
  }
};

//define write block
Blockly.Language.car_logic = {
  category: 'Custom',
  helpUrl: '',
  init: function() {
	  this.setColour(120);
	  this.appendValueInput("IF0")
	    .setCheck(Boolean)
	    .appendTitle("Check Line Using");
	  this.appendStatementInput('DO0')
	    .appendTitle("Then");
	  this.appendValueInput("IF1")
      .setCheck(Boolean)
      .appendTitle("Check Line Using");
	  this.appendStatementInput('DO1')
	  .appendTitle("If no line detected");
	  this.appendStatementInput('DO2')
	  .appendTitle("Then");
	  this.setPreviousStatement(true);
	  this.setNextStatement(true);
	  this.contextMenu = false;
	}
};

Blockly.Language.car_turnleft = {
	category: 'Custom',
	helpUrl: '',
	init: function() {
		this.setColour(0);
		this.appendDummyInput()
		.appendTitle("Turn Left");
		this.setPreviousStatement(true);
		this.setTooltip("");
		this.contextMenu = false;
	}
};

Blockly.Language.car_turnright = {
		category: 'Custom',
		helpUrl: '',
		init: function() {
			this.setColour(0);
			this.appendDummyInput()
			.appendTitle("Turn Right");
			this.setPreviousStatement(true);
			this.setTooltip("");
			this.contextMenu = false;
				}
};

Blockly.Language.car_turnforward = {
		category: 'Custom',
		helpUrl: '',
		init: function() {
			this.setColour(0);
			this.appendDummyInput()
			.appendTitle("Forward");
			this.setPreviousStatement(true);
			this.setTooltip("");
			this.contextMenu = false;
		}
};

Blockly.Language.car_lefteye = {
		category: 'Custom',
		helpUrl: '',
		init: function() {
			this.setColour(200);
			this.setOutput(true, null);
			this.appendDummyInput()
			.appendTitle("Left Eye");
			this.setTooltip("");
			this.contextMenu = false;
		}
};

Blockly.Language.car_righteye = {
		category: 'Custom',
		helpUrl: '',
		init: function() {
			this.setColour(200);
			this.setOutput(true, null);
			this.appendDummyInput()
				.appendTitle("Right Eye");
			this.setTooltip("");
			this.contextMenu = false;
		}
};

Blockly.Language.serial_read = {
	  category: 'Custom',
	  helpUrl: '',
	  init: function() {
	    this.setColour(230);
		this.appendDummyInput("")
		    .appendTitle("Serial Print PIN#")
		    .appendTitle(new Blockly.FieldDropdown(profile.default.analog), "PIN");
	    this.setOutput(true, 'Number');
	    this.setTooltip('input block');
	  	}
};

Blockly.Arduino.car_logic = function() {
	  // If/elseif/else condition.
	  var argument = Blockly.Arduino.valueToCode(this, 'IF0',
	      Blockly.Arduino.ORDER_ATOMIC) || 'false';
	  var branch = Blockly.Arduino.statementToCode(this, 'DO0');
	  var code = 'if (' + argument + ') {\n' + branch + '\n}\n';
	  var argument = Blockly.Arduino.valueToCode(this, 'IF1',
		  Blockly.Arduino.ORDER_ATOMIC) || 'false';
	  var branch = Blockly.Arduino.statementToCode(this, 'DO1');
	  code += 'else if (' + argument + ') {\n' + branch + '\n}\n';
	  var branch = Blockly.Arduino.statementToCode(this, 'DO2');
	  code += 'else {\n' + branch + '\n}\n';
	  return code + '\n';
};

Blockly.Arduino.car_turnleft = function() {
	  // If/elseif/else condition.
	  Blockly.Arduino.setups_['setup_car'] = 'pinMode(3, OUTPUT);\n pinMode(5, OUTPUT);\n pinMode(6, OUTPUT);\n pinMode(9, OUTPUT);\n';
	  var code = 'analogWrite(3 , 0 );\nanalogWrite(5 , 0);\nanalogWrite(6 , 255 );\nanalogWrite(9 , 0);';
	  return code + '\n';
};

Blockly.Arduino.car_turnright = function() {
	  // If/elseif/else condition.
	  Blockly.Arduino.setups_['setup_car'] = 'pinMode(3, OUTPUT);\n pinMode(5, OUTPUT);\n pinMode(6, OUTPUT);\n pinMode(9, OUTPUT);\n';
	  var code = 'analogWrite(3 , 0 );\nanalogWrite(5 , 255);\nanalogWrite(6 , 0 );\nanalogWrite(9 , 0);';
	  return code + '\n';
};

Blockly.Arduino.car_turnforward = function() {
	  // If/elseif/else condition.
	  Blockly.Arduino.setups_['setup_car'] = 'pinMode(3, OUTPUT);\n pinMode(5, OUTPUT);\n pinMode(6, OUTPUT);\n pinMode(9, OUTPUT);\n';
	  var code = 'analogWrite(3 , 0 );\nanalogWrite(5 , 255);\nanalogWrite(6 , 255 );\nanalogWrite(9 , 0);';
	  return code + '\n';
};

Blockly.Arduino.car_lefteye = function() {
	  // If/elseif/else condition.
	  Blockly.Arduino.definitions_['def_lefteye'] = 'int lefteye(){\n  if(analogRead(0)>500) return 1;\n  else return 0;\n}\n';
	  var code = 'lefteye()';
	  return [code ,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.car_righteye = function() {
	  // If/elseif/else condition.
	  Blockly.Arduino.definitions_['def_righteye'] = 'int righteye(){\n  if(analogRead(2)>500) return 1;\n  else return 0;\n}\n';
	  var code = 'righteye()';
	  return [code ,Blockly.Arduino.ORDER_ATOMIC];
};
// define generators
Blockly.Arduino.custom_write = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);

  var code = 'analogWrite('+dropdown_pin+','+value_num+');\n';
  return code;
};

Blockly.Arduino.custom_read = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  
  // Blockly.Arduino.definitions_['define_custom_read'] = '#include &lt;Servo.h&gt;\n';
  // Blockly.Arduino.definitions_['var_custom_read'+dropdown_pin] = 'Servo servo_'+dropdown_pin+';\n';
  // Blockly.Arduino.setups_['setup_custom_read_'+dropdown_pin] = 'servo_'+dropdown_pin+'.attach('+dropdown_pin+');\n';
  
  var code = 'analogRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.serial_read = function() {
  Blockly.Arduino.setups_['setup_serial'] = 'Serial.begin(9600);\n';
  var dropdown_pin = this.getTitleValue('PIN');  
  var code = 'Serial.println(analogRead('+dropdown_pin+'))';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
