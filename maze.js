Blockly.JavaScript['controls_repeat'] = function (block, generator) {
    // Repeat n times.
    let repeats;

    if (block.getField('TIMES')) {
        // Internal number.
        repeats = String(Number(block.getFieldValue('TIMES')));
    } else {
        // External number.
        repeats = generator.valueToCode(block, 'TIMES', Order.ASSIGNMENT) || '0';
    }

    let branch = generator.statementToCode(block, 'DO');
    branch = generator.addLoopTrap(branch, block);
    let code = '';
    const loopVar = 'count';
    let endVar = repeats;
    console.log("aaaaaaaaaaaaaa");

    if (!repeats.match(/^\w+$/) && !stringUtils.isNumber(repeats)) {
        endVar = 'repeat_end';
        code += 'var ' + endVar + ' = ' + repeats + ';\n';
    }

    for (let loopVar = 0; loopVar < endVar; loopVar++) {
        code += branch;
    }

    // code +=
    //     'for (var ' +
    //     loopVar +
    //     ' = 0; ' +
    //     loopVar +
    //     ' < ' +
    //     endVar +
    //     '; ' +
    //     loopVar +
    //     '++) {\n' +
    //     branch +
    //     '}\n';
    return code;
}

var toolbox = {
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

const theme = Blockly.Theme.defineTheme('alura', {
    'base': Blockly.Themes.Classic,
    'blockStyles': {
        'move_blocks': {
            'colourPrimary': '#2d8aec',
            'colourSecondary': '#84eec1',
            'colourTertiary': '#154580'
        }
    }
});

const workspace = Blockly.inject('blocklyWorkspace', {
    toolbox,
    theme: "alura",
    trashcan: true
});

document.getElementById('blocklyRun').addEventListener('click', function () {
    const code = Blockly.JavaScript.workspaceToCode(workspace);
    console.log(code);
    move(code);
});
