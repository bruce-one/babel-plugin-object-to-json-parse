"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
/* eslint-disable no-redeclare */
function ObjectExpression(path) {
    try {
        const obj = utils_1.converter(path.node);
        const json = JSON.stringify(obj);
        // escaping for single quotes
        const escapedJson = json.replace(/'/g, "\\'");
        path.replaceWithSourceString(`JSON.parse('${escapedJson}')`);
    }
    catch (e) {
        // disable error message
        // const { loc } = path.parent
        // const line = loc && loc.start.line
        // console.error(
        //   `At ${line} line (start) : The object wasn't converted (${e.message})`
        // )
    }
}
exports.ObjectExpression = ObjectExpression;
