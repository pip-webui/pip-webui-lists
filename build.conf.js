module.exports = {
    module: {
        name: 'pipLists',
        styles: 'lists'
    },
    build: {
        js: true,
        ts: true,
        html: true,
        css: true,
        lib: true,
        images: false,
        dist: false
    },
    file: {
        lib: [
            '../pip-webui-lib/dist/**/*',
        ]
    },
    samples: {
        port: 8140
    },
    api: {
        port: 8141
    }
};
