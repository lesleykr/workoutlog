const Sequelize = require('sequelize');
const sequelize = new Sequelize('WorkoutLog', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to WorkoutLog postgres db');
    },
    function(err) {
        console.log(err);
    }
);
module.exports = sequelize;