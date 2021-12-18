module.exports = (sequelize,Datatypes)=>{
    const User = sequelize.define("User",{
        email:{
            type:Datatypes.STRING,
            primaryKey: true,
        },
        password:{
            type:Datatypes.STRING,
            allowNull:false
        },
       
    }
    )
    
    User.associate = function(models) {
        User.hasMany(models.Posts,{
            onDelete:"cascade"
        })
    };
    return User;
}