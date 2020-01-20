const express = require('express');
const app = express();
const http = require('http').createServer(app);
const AppDB = require('./db');
var io = require('socket.io')(http);

const port = process.env.port || 8081;

// app.get('/', (req, res) => {
//     res.send('Hello From Express');
// });
app.use('/assets', express.static(__dirname + '/public/assets'));

io.on('connection', (socket) => {
    // io.emit('con_success', 'You connected success');
    socket.on('user_login', (user) => {
        const CDB = new AppDB('database.sqlite3');

        CDB.get('SELECT id, username, created_on FROM `users` WHERE `username` = ? AND `password` = ?',
                [user.username, user.password])
            .then(user => {
                if (user) {
                    CDB.run('UPDATE `users` SET `online` = ?, `socket_id` = ? WHERE `id` = ?',
                        [1, socket.id, user.id]);

                    // CDB.all(`SELECT 'user_id', 'room_id', FROM 'user_rooms' 
                    // AS urm LEFT JOIN 'chat_rooms' 
                    // AS chtrm ON urm.room_id = chtrm.room_id WHERE urm.user_id =?`,
                    // [res.id])
                    // .then(rooms => {
                    //     data['userRooms'] = rooms;
                    // })

                    CDB.all(
                            'SELECT `user_id`, `freind_id`, `username` `online` FROM `user_chats` AS fid LEFT JOIN `users` AS usr ON fid.freind_id = usr.id WHERE fid.user_id = ?',
                            [user.id])
                        .then(chats => {

                            CDB.all(`SELECT * FROM 'chat_rooms'`)
                                .then(rooms => {
                                    io.to(socket.id).emit('login_success', user, chats, rooms);
                                    // io.to(socket.id).emit('chat_rooms', rooms);
                                });
                        });

                } else {
                    io.to(socket.id).emit('login_fail', 'Wrong Username or Password');
                }
            })
    });

    socket.on('joinRoom', (room, user) => {
        socket.join(room.room_id);
        io.to(room.room_id).emit('memberJoined', user);
    });

    socket.on('sendMessage', (message) => {
        io.to(message.room.room_id).emit('recieveMessage', message);
    });

    socket.on('disconnect', () => {
        const CDB = new AppDB('database.sqlite3');
        CDB.run('UPDATE `users` SET `online` = ? WHERE `socket_id` = ?',
            [0, socket.id]);
    })
});

http.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})