"use strict";
const plugin_1 = require("./plugin");
const object_expression_1 = require("./visitors/object_expression");
module.exports = plugin_1.buildPlugin([object_expression_1.ObjectExpression]);
