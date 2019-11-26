const io = {};

io.listen = port => { };
io.on = (command, callback) => { };
io.socket = {
    on: (command, callback) => { },
    emit: (command, payload, callback) => { },
};

module.exports = io;