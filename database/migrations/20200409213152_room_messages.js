exports.up = function (knex) {
    return knex.schema.createTable('room_messages', room_messages => {
        room_messages
            .integer('room_id')
            .references('room_id')
            .inTable('rooms');
        room_messages
            .integer('users_id')
            .references('users_id')
            .inTable('users');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('room_messages');
};
