// ...existing code...
import esbuild from 'esbuild';
import stylePlugin from 'esbuild-style-plugin';
import { rimrafSync } from 'rimraf';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// Clean the dist directory
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
  if (process.argv.includes('--serve')) {
    const ctx = await esbuild.context(config);
    await ctx.serve({
      servedir: 'dist',
      port: 3000,
      host: 'localhost',
    });
    console.log('Server running at http://localhost:3000');
  } else {
    await esbuild.build(config);
    console.log('Build completed successfully');
  }
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
// ...existing code...