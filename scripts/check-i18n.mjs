#!/usr/bin/env node
/**
 * Translation check.
 *
 * TypeScript already refuses to compile a language file that is missing a key,
 * because every file is typed as `Locale`. This script is the readable version
 * of the same rule, and it also catches what the type checker cannot see:
 *
 *   - a key that exists but has been left empty
 *   - options written in a different order, which would make the buttons on a
 *     settings screen jump around when the language changes
 *   - a key that one language has and another does not
 *   - text written directly in a WXML file, in any language
 *   - wording left behind in a page or a component script
 *
 * The locale files are plain object literals, so they are loaded straight into
 * Node (which strips the type annotations) instead of being parsed here.
 *
 * Run with: npm run check:i18n
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const FALLBACK_LOCALE = 'zh-CN.ts';

const problems = [];
const notes = [];

function fail(message) {
  problems.push(message);
}

function readText(relativePath) {
  return readFileSync(join(ROOT, relativePath), 'utf8');
}

function listFiles(relativeDir) {
  return readdirSync(join(ROOT, relativeDir)).sort();
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

/** Load the object of translations a locale file exports. */
async function loadLocale(name) {
  const module = await import(pathToFileURL(join(ROOT, 'locales', name)).href);
  const exported = Object.values(module).find(
    (value) => value && typeof value === 'object' && !Array.isArray(value)
  );
  return exported;
}

/**
 * Every leaf key of a translation object, in the order it is written, with a
 * note of whether it actually holds any words.
 */
function collectKeys(value, prefix = '', found = new Map()) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectKeys(item, `${prefix}[${index}]`, found));
    return found;
  }
  if (value && typeof value === 'object') {
    for (const key of Object.keys(value)) {
      collectKeys(value[key], prefix ? `${prefix}.${key}` : key, found);
    }
    return found;
  }
  found.set(prefix, { order: found.size, empty: typeof value !== 'string' || value.trim() === '' });
  return found;
}

const localeFiles = listFiles('locales').filter((name) => name.endsWith('.ts'));

if (localeFiles.length < 2) {
  fail('locales/ needs the fallback language and at least one more language.');
}

const reference = collectKeys(await loadLocale(FALLBACK_LOCALE));
notes.push(`${reference.size} keys in locales/${FALLBACK_LOCALE}`);

for (const [key, info] of reference) {
  if (info.empty) {
    fail(`locales/${FALLBACK_LOCALE}: "${key}" is empty. Every key needs real wording.`);
  }
}

for (const name of localeFiles) {
  if (name === FALLBACK_LOCALE) {
    continue;
  }
  const candidate = collectKeys(await loadLocale(name));
  notes.push(`${candidate.size} keys in locales/${name}`);

  for (const key of reference.keys()) {
    if (!candidate.has(key)) {
      fail(`locales/${name} is missing the key "${key}".`);
    } else if (candidate.get(key).empty) {
      fail(`locales/${name}: "${key}" is empty.`);
    }
  }

  for (const [key, info] of candidate) {
    if (!reference.has(key)) {
      fail(`locales/${name} has "${key}", which the fallback language does not have.`);
    } else if (key.includes('Options.') && reference.get(key).order !== info.order) {
      fail(
        `locales/${name}: "${key}" is in a different place. Options must be written in ` +
          'the same order in every language, or the buttons jump around when the ' +
          'language changes.'
      );
    }
  }
}

/**
 * WXML may only contain bindings, never text of its own, in any language.
 * Comments and tags are removed first, so only real text nodes are left.
 */
for (const file of [
  ...listSourceFiles('pages', ['.wxml']),
  ...listSourceFiles('components', ['.wxml']),
  ...listSourceFiles('templates', ['.wxml'])
]) {
  const stripped = readText(file)
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\{\{[^}]*\}\}/g, ' ');

  // Pure symbols such as "!" are allowed; words and numbers are not.
  if (/\p{L}|\p{N}/u.test(stripped)) {
    fail(
      `${file} contains text of its own (${JSON.stringify(stripped.trim().slice(0, 40))}). ` +
        'All wording belongs in locales/.'
    );
  }
}

/** Page and component scripts may not carry wording either. */
const CJK = /[　-〿一-鿿＀-￯]/;
for (const file of [
  ...listSourceFiles('pages', ['.ts']),
  ...listSourceFiles('components', ['.ts'])
]) {
  const source = readText(file)
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '');
  if (CJK.test(source)) {
    fail(`${file} contains Chinese text. All wording belongs in locales/.`);
  }
}

for (const note of notes) {
  console.log(`  ${note}`);
}

if (problems.length > 0) {
  console.error(`\n${problems.length} translation problem(s) found:\n`);
  for (const problem of problems) {
    console.error(`  - ${problem}`);
  }
  process.exit(1);
}

console.log('\nTranslation checks passed.');
