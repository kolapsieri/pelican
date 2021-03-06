module.exports = function (io, songs) {
	io.sockets.on('connection', function (socket) {
		socket.on('fetch', function () {
			socket.emit('reset', songs.toJSON());
		});

		socket.on('whatsPlaying?', function () {
			if (songs.length) {
				socket.emit('songChange', songs.first().toJSON());				
			} else {
				socket.emit('songChange', false);
			}
		});

		socket.on('songNext', function () {
			songs.next();
		});
	});

	songs.on('add', function (song) {
		io.sockets.emit('add', song);
	});

	songs.on('remove', function (song) {
		io.sockets.emit('remove', song);
	});

	songs.on('change', function (song) {
		io.sockets.emit('change', song);
	});

	songs.on('next', function (song) {
		io.sockets.emit('songChange', song);
	});
};