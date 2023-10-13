import { viteSingleFile } from 'vite-plugin-singlefile';

export default {
    build: {
        sourcemap: false,
    },
    plugins: [viteSingleFile()],
};
