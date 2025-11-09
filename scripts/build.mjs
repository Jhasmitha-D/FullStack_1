// ...existing code...
import esbuild from 'esbuild';
import stylePlugin from 'esbuild-style-plugin';
import { rimrafSync } from 'rimraf';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import fs from 'fs';
import path from 'path';

const INDEX_SRC = path.resolve('index.html');
const INDEX_DEST_DIR = path.resolve('dist');
const INDEX_DEST = path.resolve('dist/index.html');

function copyIndexHtml() {
  try {
    if (!fs.existsSync(INDEX_SRC)) {
      console.warn('⚠️ index.html not found at', INDEX_SRC);
      return;
    }

    // Ensure dist exists
    fs.mkdirSync(INDEX_DEST_DIR, { recursive: true });
    fs.copyFileSync(INDEX_SRC, INDEX_DEST);
    console.log('✅ index.html copied to dist/');
  } catch (err) {
    console.error('❌ Failed to copy index.html:', err);
  }
}

// Clean the dist directory first
rimrafSync('dist');

// Base configuration
const baseConfig = {
  entryPoints: ['src/main.tsx'],
  bundle: true,
  outdir: 'dist',
  platform: 'browser',
  target: 'es2020',
  jsx: 'automatic',
  loader: {
    '.png': 'file',
    '.jpg': 'file',
    '.jpeg': 'file',
    '.gif': 'file',
    '.svg': 'file',
  },
  plugins: [
    stylePlugin({
      postcss: {
        // pass PostCSS plugins (Tailwind + Autoprefixer)
        plugins: [tailwindcss, autoprefixer],
      },
    }),
  ],
  define: {
    'process.env.NODE_ENV': process.argv.includes('--production')
      ? '"production"'
      : '"development"',
  },
};

// Development configuration
const devConfig = {
  ...baseConfig,
  sourcemap: true,
  minify: false,
};

// Production configuration
const prodConfig = {
  ...baseConfig,
  sourcemap: false,
  minify: true,
};

// Determine which config to use
const config = process.argv.includes('--production') ? prodConfig : devConfig;

// Build the application
try {
  const isProduction = process.argv.includes('--production');
  const isWatch = process.argv.includes('--watch');

  if (isWatch) {
    // In watch mode use esbuild's context API which works across versions
    const ctx = await esbuild.context(config);

    // Start watching/rebuilding. onRebuild isn't available on ctx.watch, so use ctx.watch()
    await ctx.watch();

    // First build has completed at this point, copy index.html
    copyIndexHtml();
    console.log('Watching for changes... (press Ctrl+C to stop)');
  } else {
    // One-off build
    await esbuild.build(config);
    console.log('Build completed successfully');
    copyIndexHtml();
  }
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
// ...existing code...