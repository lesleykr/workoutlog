module.exports = (sequelize, DataTypes) => {
    const log = sequelize.define('log', {
        description: {
            type: DataTypes.STRING,
            allowNull: false
    },
        definition: {
            type: DataTypes.STRING,
            allowNull: false
        },
        result: {
            type: DataTypes.STRING,
            allowNull: false
        },
        owner_id: {
            type: DataTypes.INTEGER
        }    
})
return log;
}