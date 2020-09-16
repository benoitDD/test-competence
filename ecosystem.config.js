module.exports = {
    apps: [
        {
            name: 'myApp',
            script: 'build',
            instances: 'max',
            exec_mode: 'cluster',
            restart_delay: 3000,
            max_memory_restart: '150M',
            restart_delay: 800,
            max_restarts: 10,
            env: {
                PORT: 8080,
            },
            env_local: {
                NODE_ENV: 'development',
                DATABASE_URI: 'mongodb://192.168.99.100/myApp',
            },
        },
    ],
}
