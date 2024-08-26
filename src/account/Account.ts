import { Model, DataTypes } from "sequelize";
import { sequelize } from "../persistence/SequelizeDb";

export class Account extends Model {
    declare id: number;
    declare amount: number;
}

Account.init({
    id:  {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    amount: DataTypes.NUMBER
}, { sequelize, modelName: 'account' });