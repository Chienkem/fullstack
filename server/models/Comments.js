module.exports = (sequelize,Datatypes)=>{
    const Comments = sequelize.define("Comments",{
        Comment:{
            type:Datatypes.STRING,
            allowNull:false
        }
    }
    )
    return Comments
}