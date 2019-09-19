"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function buildPlugin(visitors) {
    const visitorMap = {};
    for (const visitor of visitors) {
        // @ts-ignore
        visitorMap[visitor.name] = visitor;
    }
    return () => ({
        name: 'babel-plugin-object-to-json-parse',
        visitor: visitorMap
    });
}
exports.buildPlugin = buildPlugin;
