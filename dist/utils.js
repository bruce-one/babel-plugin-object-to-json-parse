"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@babel/types");
const isValidJsonValue = (node) => {
    if (types_1.isNumericLiteral(node) ||
        types_1.isStringLiteral(node) ||
        types_1.isBooleanLiteral(node) ||
        types_1.isNullLiteral(node) ||
        types_1.isArrayExpression(node) ||
        types_1.isObjectExpression(node)) {
        return true;
    }
    return false;
};
/**
 * Check whether given ObjectExpression consists of only `ObjectProperty`s as its properties.
 */
const isObjectExpressionWithOnlyObjectProperties = (node) => {
    return node.properties.every(property => types_1.isObjectProperty(property));
};
const isConvertibleObjectProperty = (properties) => {
    return properties.every(node => !node.computed);
};
function converter(node) {
    if (!isValidJsonValue(node)) {
        throw new Error('Invalid value is included.');
    }
    if (types_1.isStringLiteral(node)) {
        const { value } = node;
        if (/"/.test(value)) {
            throw new Error('Invalid value is included.');
        }
        return value;
    }
    if (types_1.isNullLiteral(node)) {
        return null;
    }
    if (types_1.isArrayExpression(node)) {
        const { elements } = node;
        return elements.map(node => converter(node));
    }
    if (types_1.isObjectExpression(node)) {
        if (!isObjectExpressionWithOnlyObjectProperties(node)) {
            throw new Error('Invalid syntax is included.');
        }
        const { properties } = node;
        if (!isConvertibleObjectProperty(properties)) {
            throw new Error('Invalid syntax is included.');
        }
        return properties.reduce((acc, cur) => {
            const key = cur.key.name || cur.key.value;
            // see issues#10
            if (typeof key === 'number' && !Number.isSafeInteger(key)) {
                throw new Error('Invalid syntax is included.');
            }
            const value = converter(cur.value);
            return Object.assign({}, acc, { [key]: value });
        }, {});
    }
    return node.value;
}
exports.converter = converter;
