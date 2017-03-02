module.exports = {
    module: {
        name: 'pipLists',
        styles: 'lists',
        export: 'pip.lists',
        standalone: 'pip.lists'
    },
    build: {
        js: false,
        ts: false,
        tsd: true,
        bundle: true,
        html: true,
        sass: true,
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
