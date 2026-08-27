#!/usr/bin/env node
/**
 * Non-interactive TWA Android project generation for CI.
 *
 * Uses @bubblewrap/core's programmatic API directly, bypassing the
 * interactive CLI prompts that make `bubblewrap init` unsuitable for CI.
 *
 * Required environment variables:
 *   KEYSTORE_PASSWORD  — keystore password
 *   KEY_PASSWORD       — key password
 *   JAVA_HOME          — path to JDK (set by actions/setup-java)
 *   ANDROID_SDK_ROOT   — path to Android SDK (set by the runner environment)
 */

'use strict';

const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

async function main() {
  // Locate @bubblewrap/core inside the globally installed @bubblewrap/cli.
  // BUBBLEWRAP_GLOBAL_ROOT is set by the CI workflow to the real post-install
  // global root, which may differ from what `npm root -g` reports when
  // actions/setup-node has swapped the active Node binary.
  const candidates = [];
  if (process.env.BUBBLEWRAP_GLOBAL_ROOT) {
    candidates.push(path.join(process.env.BUBBLEWRAP_GLOBAL_ROOT, '@bubblewrap', 'core'));
  }
  candidates.push(path.join(execSync('npm root -g', { encoding: 'utf8' }).trim(), '@bubblewrap', 'core'));

  const corePath = candidates.find(p => fs.existsSync(p));
  if (!corePath) {
    throw new Error(
      `@bubblewrap/core not found in any of:\n  ${candidates.join('\n  ')}\n` +
      'Ensure @bubblewrap/cli is installed globally before running this script.'
    );
  }

  const { TwaManifest, TwaGenerator, Config } = require(corePath);

  const twaDir = path.resolve('twa');
  const manifestPath = path.join(twaDir, 'twa-manifest.json');

  if (!fs.existsSync(manifestPath)) {
    throw new Error(`twa-manifest.json not found at ${manifestPath}`);
  }

  // Load manifest from the committed config file
  const twaManifest = await TwaManifest.fromFile(manifestPath);

  // Inject signing credentials — these are intentionally absent from twa-manifest.json
  twaManifest.signingKey.keystorePassword = process.env.KEYSTORE_PASSWORD;
  twaManifest.signingKey.keyPassword = process.env.KEY_PASSWORD;

  const androidSdkPath =
    process.env.ANDROID_SDK_ROOT ||
    process.env.ANDROID_HOME ||
    '/usr/local/lib/android/sdk';

  const jdkPath = process.env.JAVA_HOME;
  if (!jdkPath) throw new Error('JAVA_HOME is not set');

  console.log('Generating TWA Android project');
  console.log('  Target dir  :', twaDir);
  console.log('  JDK         :', jdkPath);
  console.log('  Android SDK :', androidSdkPath);
  console.log('  Version     :', twaManifest.appVersionName, '/ code', twaManifest.appVersionCode);

  const config = new Config(jdkPath, androidSdkPath);
  const generator = new TwaGenerator();

  const result = await generator.createTwaProject(twaDir, twaManifest, config);

  // Handle both Result<T,E> monad patterns used across bubblewrap versions
  if (result != null) {
    if (typeof result.isError === 'function' && result.isError()) {
      throw typeof result.unwrapError === 'function'
        ? result.unwrapError()
        : new Error('TwaGenerator.createTwaProject returned an error result');
    }
    if (result.ok === false && result.error) {
      throw result.error;
    }
  }

  console.log('✓ Android project generated successfully');
}

main().catch(e => {
  console.error('✗ TWA project generation failed:', e.message || e);
  process.exit(1);
});
