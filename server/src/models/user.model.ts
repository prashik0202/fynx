import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from "sequelize";
import sequelize from "../database/connection";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>>{
  declare id: CreationOptional<string>;
  declare name: string;
  declare email: string;
  declare hashedPassword: string; // store the hashed password
  declare verified: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // assocation:
  declare verificationTokens? :NonAttribute<any[]>;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        field: "id"
    },
    name: {
      type: DataTypes.STRING(120),
      allowNull: false,
      field: "name"
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      field: "email"
    },
    hashedPassword: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "hashed_password"
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "verified"
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "created_at"
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "updated_at"
    }
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    indexes: [
      {
        unique: true,
        fields: ["email"]
      }
    ]
  }
)


export default User;
