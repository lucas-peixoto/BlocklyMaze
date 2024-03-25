class GnarusBlockly {
    constructor(maze, workspaceId, runButtonId, clearButtonId) {
        this.maze = maze;
        this.createBlocks();
        this.workspace = this.createWorkspace(workspaceId);
        this.runButton = document.getElementById(runButtonId);
        this.clearButton = document.getElementById(clearButtonId);
        this.createEventListeners();
    }

    createBlocks() {
        Blockly.Blocks["move_right"] = {
            init: function () {
                this.jsonInit({
                    type: 'move_right',
                    style: 'move_blocks',
                    previousStatement: null,
                    nextStatement: null,
                });
                this.appendDummyInput()
                    .appendField(new Blockly.FieldImage('./img/arrow_right.svg', 15, 15, 'Forward'));
            }
        };

        Blockly.JavaScript.forBlock['move_right'] = function () {
            return `moveRight(1);\n`;
        };

        Blockly.Blocks["move_left"] = {
            init: function () {
                this.jsonInit({
                    type: 'move_left',
                    style: 'move_blocks',
                    previousStatement: null,
                    nextStatement: null,
                });
                this.appendDummyInput()
                    .appendField(new Blockly.FieldImage('./img/arrow_left.svg', 15, 15, 'Backward'));
            }
        };

        Blockly.JavaScript.forBlock['move_left'] = function () {
            return `moveLeft(1);\n`;
        };

        Blockly.Blocks["move_up"] = {
            init: function () {
                this.jsonInit({
                    type: 'move_up',
                    style: 'move_blocks',
                    previousStatement: null,
                    nextStatement: null,
                });
                this.appendDummyInput()
                    .appendField(new Blockly.FieldImage('./img/arrow_up.svg', 15, 15, 'Up'));
            }
        };

        Blockly.JavaScript.forBlock['move_up'] = function () {
            return `moveUp(1);\n`;
        };

        Blockly.Blocks["move_down"] = {
            init: function () {
                this.jsonInit({
                    type: 'move_down',
                    style: 'move_blocks',
                    previousStatement: null,
                    nextStatement: null,
                });
                this.appendDummyInput()
                    .appendField(new Blockly.FieldImage('./img/arrow_down.svg', 15, 15, 'Down'));
            }
        };

        Blockly.JavaScript.forBlock['move_down'] = function () {
            return `moveDown(1);\n`;
        }

        Blockly.JavaScript.forBlock['controls_repeat'] = function (block, generator) {
            let repeats;

            if (block.getField('TIMES')) {
                // Internal number.
                repeats = Number(block.getFieldValue('TIMES'));
            } else {
                // External number.
                repeats = generator.valueToCode(block, 'TIMES', Order.ASSIGNMENT) || 0;
            }

            let branch = generator.statementToCode(block, 'DO');
            let code = '';
            let endVar = repeats;

            for (let loopVar = 0; loopVar < endVar; loopVar++) {
                code += branch.trim() + '\n';
            }

            return code;
        }
    }

    createWorkspace(workspaceId) {
        this.toolbox = {
            "kind": "flyoutToolbox",
            "contents": [
                {
                    "kind": "block",
                    "type": "move_right"
                },
                {
                    "kind": "block",
                    "type": "move_left"
                },
                {
                    "kind": "block",
                    "type": "move_up"
                },
                {
                    "kind": "block",
                    "type": "move_down"
                },
                {
                    "kind": "block",
                    "type": "controls_repeat"
                }
            ]
        };

        Blockly.Theme.defineTheme('alura', {
            'base': Blockly.Themes.Classic,
            'blockStyles': {
                'move_blocks': {
                    'colourPrimary': '#2d8aec',
                    'colourSecondary': '#84eec1',
                    'colourTertiary': '#154580'
                }
            }
        });

        return Blockly.inject(workspaceId, {
            toolbox: this.toolbox,
            theme: "alura",
            trashcan: true
        });
    }

    runCode() {
        const code = Blockly.JavaScript.workspaceToCode(this.workspace);
        console.log(code);

        try {
            code.split('\n').forEach((line, index) => {
                if (line.trim() !== "") {
                    setTimeout(() => {
                        eval("this.maze." + line.trim())
                    }, 300 * (index + 1));
                }
            });
        } catch (error) {
            this.clearCode();
        }
    }

    clearCode() {
        this.maze.resetPlayer();
        // this.workspace.clear();
    }

    createEventListeners() {
        this.runButton.addEventListener('click', () => {
            this.runCode();
        });

        this.clearButton.addEventListener('click', () => {
            this.clearCode();
        });
    }
}