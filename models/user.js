const Sequelize=require('sequelize')

const sequelize=require('../util/database')

const User=sequelize.define('user',
{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    username:{
        type:Sequelize.STRING,
        allowNull:false,
        validate: {
            notNull: { args: true, msg: "You must enter a name" }
        },
    },
    email:{
        type:Sequelize.STRING,
        
    },
    phoneNumber: { 
        type:Sequelize.STRING,
        allowNull:false,
        
}
}

);

module.exports=User; 