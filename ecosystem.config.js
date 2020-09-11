module.exports = {
    apps: [
        {
            name: 'myApp',
            script: 'build',
            instances: 'max',
            exec_mode: 'cluster',
            restart_delay: 3000,
            env: {
                PORT: 8080,
            },
            env_local: {
                NODE_ENV: 'development',
            },
        },
    ],
}
