#!/usr/bin/env node

const exec = require('shelljs').exec;

const stdout = exec('git diff --cached --name-only', { silent: true }).stdout;

const files = stdout.trim().split(/\s+/);
const jsFiles = files.filter(file => /\.js$/.test(file)); // only js files

if (jsFiles.length) {
    const args = jsFiles.join(' ');
    exec(`prettier --write ${args}`);
    exec(`git add ${args}`);
}
