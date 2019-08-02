
module.exports = {
    config: {
        environment: "development",
        fontName: 'qisat-player-icons',
        path: {
            src: {
                local: 'src/',
                sass: 'src/sass/',
                images: 'src/images/',
                svg: 'src/images/svgs/',
                sprite: 'src/images/sprite/',
                ts: 'src/ts/',
                samples: 'src/samples/'
            },
            build: {
                local: 'dist/',
                fonts: 'dist/fonts/',
                images: 'dist/images/',
                css: 'dist/css/',
                samples: 'dist/samples/'
            }
        }
    }
};