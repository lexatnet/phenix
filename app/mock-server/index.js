const jsonServer = require('json-server');
const _ = require('lodash');
const HTTPStatus = require('http-status');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const commandLineArgs = require('command-line-args');

const optionDefinitions = [
    {
        name: 'port',
        alias: 'p',
        type: Number,
        defaultValue: 3000
    }
];

const options = commandLineArgs(optionDefinitions);
// Set default middlewares (logger, static, cors and no-cache)

server.use(middlewares);

server.use((req, res, next) => {
    req.headers['content-type'] = 'application/json';
    next();
});

server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
            if (req.method === 'POST') {
                req.method = 'GET';
            }
            // Continue to JSON Server router
            next();
});

// Use default router
server.use((req, res, next) => {
    router(req, res, next);
});

server.listen(options.port, () => {
    console.log(`JSON Server is running on port:${options.port}`);
});
