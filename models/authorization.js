'use strict';
module.exports = (sequelize, DataTypes) => {
  const authorization = sequelize.define('authorization', {
    grant_type: DataTypes.STRING,
    code: DataTypes.STRING,
    redirect_uri: DataTypes.STRING,
    client_id: DataTypes.STRING,
    client_secret: DataTypes.STRING,
  }, {});
  authorization.associate = function(models) {
    // associations can be defined here
  };
  return authorization;
};