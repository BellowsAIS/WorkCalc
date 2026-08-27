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
 *   NODE_PATH          — set by CI to include global node_modules locations
 */

'use strict';

const path = require('path');
const fs = require('fs');

async function main() {
  // NODE_PATH is set by the CI workflow to include both the top-level global
  // node_modules and @bubblewrap/cli/node_modules, so require() finds the
  // package regardless of whether npm hoisted it or nested it.
  const { TwaManifest, TwaGenerator, Config } = require('@bubblewrap/core');

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
