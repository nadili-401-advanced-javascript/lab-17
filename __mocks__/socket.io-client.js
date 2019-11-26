const io = {};

io.listen = port => { };
io.connect = () => { };
io.socket = {
    on: (command, callback) => { },
    emit: (command, payload, callback) => { },
};

module.exports = io;