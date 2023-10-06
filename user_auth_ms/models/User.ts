import { DataTypes } from "sequelize"
import { db } from "../db/connection"

export const User = db.define('user', {
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
})