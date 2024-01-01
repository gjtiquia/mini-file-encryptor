import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/index.ts'],
    clean: true,
    noExternal: ['core'] // Builds the dependencies as well in the index.js
})