// import * as Blockly from "blockly";

class GnarusBlockly {
    constructor(maze, workspaceId, runButtonId, clearButtonId) {
        this.maze = maze;
        this.createBlocks();
        this.workspace = this.createWorkspace(workspaceId);
        this.workspace.addChangeListener(Blockly.Events.disableOrphans)
        const xmlText = `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="move_left" id=",x~@FpG5v,?7]9K3$1?}" disabled="true" x="71" y="46"></block>
  <block type="start" id="CZ{s;Nh6om0bgSa.=-s_" x="216" y="51">
    <next>
      <block type="move_right" id="#Qgt~i4H*4r$}L$G:TLl">
        <next>
          <block type="move_right" id="JC?2C^~H~;g+cf%WR5/H">
            <next>
              <block type="controls_repeat" id="fU+I!{K/.4%,ZQpkpng+">
                <field name="TIMES">3</field>
                <statement name="DO">
                  <block type="move_down" id="ijM!/p}5ycBn25tW)2te"></block>
                </statement>
                <next>
                  <block type="move_right" id="l197UKBN*2^7(oYhiKR%">
                    <next>
                      <block type="move_right" id="@s$\`i(}StC$o.@Q])J+j">
                        <next>
                          <block type="move_down" id="Hyv+CsEX|O{]JcR8S7]3"></block>
                        </next>
                      </block>
                    </next>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>
  <block type="move_up" id="ZP:O^@?V_$+X=Ybx4~hH" disabled="true" x="137" y="126"></block>
  <block type="move_left" id="{n0\`q(6i!v93w{SYMC6z" disabled="true" x="298" y="262"></block>
  <block type="move_down" id="/fba;rQ[8,f*MP-h#MA1" disabled="true" x="238" y="345"></block>
</xml>`
        // const xmlElement = Blockly.utils.xml.textToDom(xmlText);
        // Blockly.Xml.domToWorkspace(xmlElement, this.workspace);
        this.runButton = document.getElementById(runButtonId);
        this.clearButton = document.getElementById(clearButtonId);
        this.createEventListeners();
    }

    createBlocks() {
        Blockly.Blocks["start"] = {
            init: function () {
                this.jsonInit({
                    type: 'start',
                    message0: 'Start',
                    // style: 'move_blocks',
                    nextStatement: null
                });
            }
        };

        Blockly.JavaScript.forBlock['start'] = function () {
            return "";
        }

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
            const repeats = Number(block.getFieldValue('TIMES')) || generator.valueToCode(block, 'TIMES', Order.ASSIGNMENT) || 0;
            const branch = generator.statementToCode(block, 'DO').trim();
            let code = '';

            for (let i = 0; i < repeats; i++) {
                code += branch + '\n';
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
                    "type": "start"
                },
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
            maxInstances: {
                'start': 1
            },
            theme: "alura",
            trashcan: true
        });
    }

    runCode() {
        const code = Blockly.JavaScript.workspaceToCode(this.workspace);
        console.log(code);
        console.log(Blockly.Xml.workspaceToDom(this.workspace));
        console.log(Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(this.workspace)));

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