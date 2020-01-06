'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    created_by: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    img_thumbnail: DataTypes.STRING,
    is_share: DataTypes.BOOLEAN
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
  };
  return Post;
};