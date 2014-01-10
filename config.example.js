// # Ghost Configuration
// Setup your Ghost install for various environments

var path = require('path'),
    config;

config = {
    // ### Development **(default)**
    development: {
        // The url to use when providing links to the site, E.g. in RSS and email.
        url: 'http://ghost.politkz.com',

        // Example mail config
        // Visit http://docs.ghost.org/mail for instructions
        // ```
        mail: {
	    transport: 'sendmail',
            fromaddress: 'no-reply@politkz.com',
            options: {}
	},
        database: {
            client: 'mysql',
	    connection: {
            	host: '172.17.42.1',  // linked container
            	port: 3306,
            	user: 'ghost',
		password: 'qrS4L5Y6l2nT',
            	database: 'ghost',
            	charset: 'utf8'
            },
            debug: false
        },
        server: {
            // Host to be passed to node's `net.Server#listen()`
            host: '0.0.0.0',
            // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
            port: '2368'
        }
    },

    // ### Production
    // When running Ghost in the wild, use the production environment
    // Configure your URL and mail settings here
    production: {
        url: 'http://ghost.politkz.com',
        mail: {
            transport: 'sendmail',
            fromaddress: 'no-reply@politkz.com',
            options: {}
        },
        database: {
            client: 'mysql',
            connection: {
                host: '172.17.42.1',  // linked container
                port: 3306,
                user: 'ghost',
                password: 'qrS4L5Y6l2nT',
                database: 'ghost',
                charset: 'utf8'
            },
            debug: false
        },
        server: {
            // Host to be passed to node's `net.Server#listen()`
            host: '0.0.0.0',
            // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
            port: '2368'
        }
    },

    // **Developers only need to edit below here**

    // ### Testing
    // Used when developing Ghost to run tests and check the health of Ghost
    // Uses a different port number
    testing: {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/content/data/ghost-test.db')
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        }
    },

    // ### Travis
    // Automated testing run through Github
    travis: {
        url: 'http://127.0.0.1:2368',
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/content/data/ghost-travis.db')
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2368'
        }
    }
};

// Export config
module.exports = config;
