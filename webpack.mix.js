const mix = require('laravel-mix');
const path = require('path');

mix.js('resources/js/app.tsx', 'public/js')
    .react()
    .extract(['axios', 'react', 'react-dom', 'react-router-dom'])
    .sass('resources/sass/app.scss', 'public/css')
    .webpackConfig({
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['*', '.js', '.jsx', '.vue', '.ts', '.tsx'],
            alias: {
                app: path.resolve(__dirname, 'resources/js'),
            },
        },
    })
    .sourceMaps(!mix.inProduction());
