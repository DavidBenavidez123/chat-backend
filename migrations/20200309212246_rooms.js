
exports.up = function (knex) {
    return knex.schema.createTable('rooms', rooms => {
        rooms.increments('room_id');
        rooms
            .string('name')
            .notNullable()
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('rooms');
};
