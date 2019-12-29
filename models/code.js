'use strict';
module.exports = (sequelize, DataTypes) => {
  const Code = sequelize.define('Code', {
    code: DataTypes.STRING,
    client_id: DataTypes.STRING,
    user_id: DataTypes.STRING
  }, {});
  Code.associate = function(models) {
    // associations can be defined here
  };
  return Code;
};