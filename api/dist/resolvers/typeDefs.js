"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { mergeTypeDefs } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");
const urlGraphqlDefs = "./**/*";
const resolversArray = loadFilesSync(urlGraphqlDefs, {
    extensions: ["graphql"],
    recursive: true
});
const graphqlDefs = mergeTypeDefs(resolversArray);
exports.default = graphqlDefs;
