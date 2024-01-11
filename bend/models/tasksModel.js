module.exports = (sequelize, DataTypes) => {
  const TasksModel = sequelize.define("TasksModel", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    task: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return TasksModel;
};
