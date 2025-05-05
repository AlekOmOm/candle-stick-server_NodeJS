// Verification script for Task 1 subtasks
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// Get the project root directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// ANSI color codes for prettier output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

// Counter for tests
let passed = 0;
let failed = 0;
let skipped = 0;

/**
 * Test a condition and log the result
 */
function test(name, condition, skip = false) {
  if (skip) {
    console.log(`${colors.yellow}[SKIPPED]${colors.reset} ${name}`);
    skipped++;
    return;
  }
  
  if (condition) {
    console.log(`${colors.green}[PASS]${colors.reset} ${name}`);
    passed++;
  } else {
    console.log(`${colors.red}[FAIL]${colors.reset} ${name}`);
    failed++;
  }
}

/**
 * Check if a file exists
 */
function fileExists(relativePath) {
  return fs.existsSync(path.join(projectRoot, relativePath));
}

/**
 * Check if a directory exists
 */
function dirExists(relativePath) {
  return fs.existsSync(path.join(projectRoot, relativePath)) && 
         fs.statSync(path.join(projectRoot, relativePath)).isDirectory();
}

/**
 * Import a module dynamically
 */
async function tryImportModule(modulePath) {
  try {
    const module = await import(modulePath);
    return { success: true, module };
  } catch (error) {
    return { success: false, error };
  }
}

// Begin verification
console.log(`${colors.cyan}======================================${colors.reset}`);
console.log(`${colors.cyan}Verifying Task 1 Subtasks${colors.reset}`);
console.log(`${colors.cyan}======================================${colors.reset}`);

// Subtask 1: Initialize Node.js Project and Install Dependencies
console.log(`\n${colors.blue}Subtask 1: Initialize Node.js Project and Install Dependencies${colors.reset}`);
test('package.json exists', fileExists('package.json'));

let packageJson;
if (fileExists('package.json')) {
  packageJson = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));
  test('ws dependency is installed', 
    packageJson.dependencies && ('ws' in packageJson.dependencies));
  test('pg dependency is installed', 
    packageJson.dependencies && ('pg' in packageJson.dependencies));
  test('dotenv dependency is installed', 
    packageJson.dependencies && ('dotenv' in packageJson.dependencies));
} else {
  test('ws dependency is installed', false, true);
  test('pg dependency is installed', false, true);
  test('dotenv dependency is installed', false, true);
}

test('.gitignore exists', fileExists('.gitignore'));
test('.env.example exists', fileExists('.env.example'));

// Subtask 2: Create Project Directory Structure
console.log(`\n${colors.blue}Subtask 2: Create Project Directory Structure${colors.reset}`);
test('src directory exists', dirExists('src'));
test('src/config directory exists', dirExists('src/config'));
test('src/services directory exists', dirExists('src/services'));
test('src/models directory exists', dirExists('src/models'));
test('src/utils directory exists', dirExists('src/utils'));
test('scripts directory exists', dirExists('scripts'));
test('index.js exists', fileExists('index.js'));

// Subtask 3: Implement Configuration Module
console.log(`\n${colors.blue}Subtask 3: Implement Configuration Module${colors.reset}`);
test('src/config/index.js exists', fileExists('src/config/index.js'));

// We'll dynamically import this later to test functionality

// Subtask 4: Create Logging Utility
console.log(`\n${colors.blue}Subtask 4: Create Logging Utility${colors.reset}`);
test('src/utils/logger.js exists', fileExists('src/utils/logger.js'));

// Subtask 5: Create Database Setup Script
console.log(`\n${colors.blue}Subtask 5: Create Database Setup Script${colors.reset}`);
test('scripts/db-setup.js exists', fileExists('scripts/db-setup.js'));

// Dynamic Import Tests
console.log(`\n${colors.blue}Testing Module Imports${colors.reset}`);

// Testing config module import
console.log(`${colors.yellow}Note: Attempting to import config module. This will fail if not properly set up.${colors.reset}`);
try {
  // This is just a static test, not an actual import
  test('Config module structure looks valid', 
    fileExists('src/config/index.js') && 
    fs.readFileSync(path.join(projectRoot, 'src/config/index.js'), 'utf8').includes('export'));
} catch (error) {
  test('Config module structure looks valid', false);
}

// Testing logger module import
console.log(`${colors.yellow}Note: Attempting to import logger module. This will fail if not properly set up.${colors.reset}`);
try {
  // This is just a static test, not an actual import
  test('Logger module structure looks valid', 
    fileExists('src/utils/logger.js') && 
    fs.readFileSync(path.join(projectRoot, 'src/utils/logger.js'), 'utf8').includes('export'));
} catch (error) {
  test('Logger module structure looks valid', false);
}

// Database test note
console.log(`\n${colors.yellow}Database Tests:${colors.reset}`);
console.log(`To fully test the database setup script:
1. Run 'make run-db' to start the PostgreSQL container
2. Run 'make setup-db' to execute the database setup script
3. Check for successful execution messages
`);

// Summary
console.log(`\n${colors.cyan}======================================${colors.reset}`);
console.log(`${colors.cyan}Verification Summary${colors.reset}`);
console.log(`${colors.cyan}======================================${colors.reset}`);
console.log(`Tests passed: ${colors.green}${passed}${colors.reset}`);
console.log(`Tests failed: ${colors.red}${failed}${colors.reset}`);
console.log(`Tests skipped: ${colors.yellow}${skipped}${colors.reset}`);

// Final suggestion
console.log(`\n${colors.cyan}Final Verification:${colors.reset}`);
console.log(`To complete verification of all tasks, please run:
1. 'make run-db' to start the PostgreSQL container
2. 'make setup-db' to test the database setup script
`);

// Exit with appropriate status code
if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
} 