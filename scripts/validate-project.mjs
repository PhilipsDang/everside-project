#!/usr/bin/env node
/**
 * EverSide project checks.
 *
 * Cycle 1 has no bundler, so this script is what keeps the project honest.
 * It fails when:
 *   - a page is missing one of its four files, or is not registered in app.json
 *   - a screen links to a route that does not exist (no unfinished navigation)
 *   - a WXML file uses a component it did not declare in usingComponents
 *   - a declared component does not exist on disk
 *   - a page or component WXSS does not import the shared design system
 *
 * Wording and translations are checked by scripts/check-i18n.mjs.
 *
 * Run with: npm run validate
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const notes = [];

function fail(message) {
  errors.push(message);
}

function readText(relativePath) {
  return readFileSync(join(ROOT, relativePath), 'utf8');
}

function readJson(relativePath) {
  return JSON.parse(readText(relativePath));
}

function exists(relativePath) {
  try {
    statSync(join(ROOT, relativePath));
    return true;
  } catch {
    return false;
  }
}

function listFiles(relativeDir) {
  return readdirSync(join(ROOT, relativeDir)).sort();
}

function listDirectories(relativeDir) {
  return listFiles(relativeDir).filter((name) => {
    if (name.startsWith('.')) {
      return false;
    }
    try {
      return statSync(join(ROOT, relativeDir, name)).isDirectory();
    } catch {
      return false;
    }
  });
}

/** Page directories may be nested one level, e.g. pages/feature/call-help. */
function listPageDirectories() {
  const found = [];
  for (const name of listDirectories('pages')) {
    if (exists(join('pages', name, 'index.json'))) {
      found.push(join('pages', name));
      continue;
    }
    for (const nested of listDirectories(join('pages', name))) {
      if (exists(join('pages', name, nested, 'index.json'))) {
        found.push(join('pages', name, nested));
      }
    }
  }
  return found;
}

function listSourceFiles(relativeDir, extensions) {
  const files = [];
  for (const name of listFiles(relativeDir)) {
    if (name.startsWith('.')) {
      continue;
    }
    const full = join(relativeDir, name);
    let stats;
    try {
      stats = statSync(join(ROOT, full));
    } catch {
      continue;
    }
    if (stats.isDirectory()) {
      files.push(...listSourceFiles(full, extensions));
    } else if (extensions.some((extension) => name.endsWith(extension))) {
      files.push(full);
    }
  }
  return files;
}

/** Custom component tags always contain a dash; built-in tags never do. */
function customComponentTags(wxml) {
  const tags = new Set();
  const pattern = /<([a-z][a-z0-9]*(?:-[a-z0-9]+)+)[\s/>]/g;
  let match = pattern.exec(wxml);
  while (match !== null) {
    tags.add(match[1]);
    match = pattern.exec(wxml);
  }
  return tags;
}

function importedTemplates(wxml) {
  const templates = new Set();
  const pattern = /<import\s+src="([^"]+)"/g;
  let match = pattern.exec(wxml);
  while (match !== null) {
    templates.add(match[1]);
    match = pattern.exec(wxml);
  }
  return templates;
}

/* -------------------------------------------------------------------------- */
/* 1. Pages: four files each, all of them registered in app.json              */
/* -------------------------------------------------------------------------- */

const appJson = readJson('app.json');
const registeredPages = appJson.pages ?? [];

if (registeredPages.length === 0) {
  fail('app.json does not list any pages.');
}

for (const page of registeredPages) {
  for (const extension of ['ts', 'json', 'wxml', 'wxss']) {
    if (!exists(`${page}.${extension}`)) {
      fail(`Page "${page}" is missing index.${extension}.`);
    }
  }
}

for (const directory of listPageDirectories()) {
  const route = `${directory}/index`;
  if (!registeredPages.includes(route)) {
    fail(`Page directory "${directory}" is not registered in app.json.`);
  }
}

if (appJson.sitemapLocation && !exists(appJson.sitemapLocation)) {
  fail(`app.json points at a missing sitemap file: ${appJson.sitemapLocation}.`);
}

if (!registeredPages.includes('pages/welcome/index')) {
  fail('The welcome screen should be the first page of app.json.');
}

/* -------------------------------------------------------------------------- */
/* 2. Components on disk                                                      */
/* -------------------------------------------------------------------------- */

const componentDirs = listDirectories('components').filter((name) =>
  exists(join('components', name, 'index.json'))
);

for (const component of componentDirs) {
  for (const extension of ['ts', 'json', 'wxml', 'wxss']) {
    if (!exists(join('components', component, `index.${extension}`))) {
      fail(`Component "${component}" is missing index.${extension}.`);
    }
  }
  const componentJson = readJson(join('components', component, 'index.json'));
  if (componentJson.component !== true) {
    fail(`Component "${component}" does not declare "component": true.`);
  }
  if (componentJson.styleIsolation !== 'apply-shared') {
    fail(
      `Component "${component}" should use "styleIsolation": "apply-shared", ` +
        'otherwise the page accessibility classes cannot reach inside it.'
    );
  }
}

/* -------------------------------------------------------------------------- */
/* 3. usingComponents resolve, and every tag in a WXML file is declared        */
/* -------------------------------------------------------------------------- */

const componentDirSet = new Set(componentDirs.map((name) => join('components', name)));

/** Tags used by a shared template, so importing pages must declare them too. */
const templateTags = new Map();
for (const name of listFiles('templates')) {
  if (name.endsWith('.wxml')) {
    templateTags.set(
      join('templates', name),
      customComponentTags(readText(join('templates', name)))
    );
  }
}

function checkUsingComponents(ownerPath, label, usedTags) {
  const config = readJson(join(ownerPath, 'index.json'));
  const declared = config.usingComponents ?? {};

  for (const [tag, target] of Object.entries(declared)) {
    const directory = join(ownerPath, target)
      .replace(/\\/g, '/')
      .replace(/\/index$/, '');
    if (!componentDirSet.has(directory)) {
      fail(`${label} declares "${tag}" -> "${target}", but ${directory} does not exist.`);
    }
  }

  for (const tag of usedTags) {
    if (!declared[tag]) {
      fail(`${label} uses <${tag}> but does not declare it in usingComponents.`);
    }
  }
}

for (const directory of listPageDirectories()) {
  const source = exists(join(directory, 'index.wxml'))
    ? readText(join(directory, 'index.wxml'))
    : '';
  const tags = customComponentTags(source);

  for (const template of importedTemplates(source)) {
    const templatePath = join(directory, template).replace(/\\/g, '/');
    const shared = templateTags.get(templatePath);
    if (!shared) {
      fail(`Page "${directory}" imports a missing template: ${templatePath}`);
      continue;
    }
    for (const tag of shared) {
      tags.add(tag);
    }
  }

  checkUsingComponents(directory, `Page "${directory}"`, tags);
}

for (const component of componentDirs) {
  const source = readText(join('components', component, 'index.wxml'));
  checkUsingComponents(
    join('components', component),
    `Component "${component}"`,
    customComponentTags(source)
  );
}

/* -------------------------------------------------------------------------- */
/* 4. No dead navigation links                                                */
/* -------------------------------------------------------------------------- */

const scriptFiles = [
  'app.ts',
  ...listSourceFiles('utils', ['.ts']),
  ...listSourceFiles('data', ['.ts']),
  ...listSourceFiles('pages', ['.ts'])
];

for (const file of scriptFiles) {
  const pattern = /'(\/pages\/[^']+)'/g;
  let match = pattern.exec(readText(file));
  while (match !== null) {
    const route = match[1].replace(/^\//, '');
    if (!registeredPages.includes(route)) {
      fail(`${file} links to "${route}", which is not registered in app.json.`);
    }
    match = pattern.exec(readText(file));
  }
}

/* -------------------------------------------------------------------------- */
/* 6. Every screen imports the shared design system                          */
/* -------------------------------------------------------------------------- */

const styleFiles = [
  'app.wxss',
  ...listSourceFiles('pages', ['.wxss']),
  ...listSourceFiles('components', ['.wxss'])
];

for (const file of styleFiles) {
  if (!readText(file).includes('styles/theme.wxss')) {
    fail(
      `${file} does not import styles/theme.wxss, so it would miss the ` +
        'text size, contrast and reduced motion classes.'
    );
  }
}

/* -------------------------------------------------------------------------- */
/* 7. Project configuration                                                   */
/* -------------------------------------------------------------------------- */

const projectConfig = readJson('project.config.json');
const compilerPlugins = projectConfig.setting?.useCompilerPlugins ?? [];

if (!compilerPlugins.includes('typescript')) {
  fail('project.config.json must enable "useCompilerPlugins": ["typescript"].');
}
if (!exists('tsconfig.json')) {
  fail('tsconfig.json is missing.');
}
if (!exists('README.md')) {
  fail('README.md is missing.');
}

notes.push(`${registeredPages.length} pages, ${componentDirs.length} components checked.`);

/* -------------------------------------------------------------------------- */
/* Report                                                                      */
/* -------------------------------------------------------------------------- */

for (const note of notes) {
  console.log(`  ${note}`);
}

if (errors.length > 0) {
  console.error(`\n${errors.length} problem(s) found:\n`);
  for (const error of errors) {
    console.error(`  - ${error}`);
  }
  process.exit(1);
}

console.log('\nProject checks passed.');
