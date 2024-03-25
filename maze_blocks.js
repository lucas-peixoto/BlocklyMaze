// Create the definition.
const move_right_json = {
    // The type is like the "class name" for your block. It is used to construct
    // new instances. E.g. in the toolbox.
    type: 'move_right',
    // The message defines the basic text of your block, and where inputs or
    // fields will be inserted.
    // message0: '->',
    style: 'move_blocks',
    // Adds an untyped previous connection to the top of the block.
    previousStatement: null,
    // Adds an untyped next connection to the bottom of the block.
    nextStatement: null,
};

Blockly.Blocks["move_right"] = {
    init: function () {
        this.jsonInit(move_right_json);
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage('./img/arrow_right.svg', 15, 15, 'Forward'));
    }
};

Blockly.JavaScript['move_right'] = function (block) {
    // const steps = block.getFieldValue('FIELD_NAME');
    // move_right is a function you would have to define yourself and provide
    // within your execution context.
    return `moveRight(1);\n`;
};

// Create the definition.
const move_left_json = {
    // The type is like the "class name" for your block. It is used to construct
    // new instances. E.g. in the toolbox.
    type: 'move_left',
    // The message defines the basic text of your block, and where inputs or
    // fields will be inserted.
    // message0: '<-',
    // Add block style
    style: 'move_blocks',
    // Adds an untyped previous connection to the top of the block.
    previousStatement: null,
    // Adds an untyped next connection to the bottom of the block.
    nextStatement: null,
};

Blockly.Blocks["move_left"] = {
    init: function () {
        this.jsonInit(move_left_json);
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage('./img/arrow_left.svg', 15, 15, 'Backward'));
    }
};

Blockly.JavaScript['move_left'] = function (block) {
    // const steps = block.getFieldValue('FIELD_NAME');
    // move_right is a function you would have to define yourself and provide
    // within your execution context.
    return `moveLeft(1);\n`;
};

// Create the definition.
const move_up_json = {
    // The type is like the "class name" for your block. It is used to construct
    // new instances. E.g. in the toolbox.
    type: 'move_up',
    // The message defines the basic text of your block, and where inputs or
    // fields will be inserted.
    // message0: '/|\\',
    style: 'move_blocks',
    // message0: new Blockly.FieldImage('img/up.svg', 15, 15, 'Up'),
    // Adds an untyped previous connection to the top of the block.
    previousStatement: null,
    // Adds an untyped next connection to the bottom of the block.
    nextStatement: null,
};

Blockly.Blocks["move_up"] = {
    init: function () {
        this.jsonInit(move_up_json);
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage('./img/arrow_up.svg', 15, 15, 'Up'));
    }
};

Blockly.JavaScript['move_up'] = function (block) {
    // const steps = block.getFieldValue('FIELD_NAME');
    // move_right is a function you would have to define yourself and provide
    // within your execution context.
    return `moveUp(1);\n`;
};

// Create the definition.
const move_down_json = {
    // The type is like the "class name" for your block. It is used to construct
    // new instances. E.g. in the toolbox.
    type: 'move_down',
    // The message defines the basic text of your block, and where inputs or
    // fields will be inserted.
    // message0: '\\|/',
    style: 'move_blocks',
    // Adds an untyped previous connection to the top of the block.
    previousStatement: null,
    // Adds an untyped next connection to the bottom of the block.
    nextStatement: null,
};

Blockly.Blocks["move_down"] = {
    init: function () {
        this.jsonInit(move_down_json);
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage('./img/arrow_down.svg', 15, 15, 'Down'));
    }
};

Blockly.JavaScript['move_down'] = function (block) {
    // const steps = block.getFieldValue('FIELD_NAME');
    // move_right is a function you would have to define yourself and provide
    // within your execution context.
    return `moveDown(1);\n`;
}