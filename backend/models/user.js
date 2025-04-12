const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false

    },
    searchRadiusMiles: {
      type: DataTypes.INTEGER,
      defaultValue: 15
    }
  }, { // <-- This is where you should add model options
    scopes: {
      currentUser: {
        attributes: { exclude: ['password'] }
      }
    }
  });

  // Hash password before saving
  User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  User.prototype.toSafeObject = function () {
    const { id, userName, email } = this;
    return { id, userName, email };
  };

  return User;
};
