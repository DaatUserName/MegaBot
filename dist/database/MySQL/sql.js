"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../../config");
module.exports = new sequelize_1.Sequelize(config_1.dbName, config_1.dbUsername, config_1.dbPassword, {
    dialect: 'mysql',
    host: config_1.host
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3FsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RhdGFiYXNlL015U1FML3NxbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlDQUFzQztBQUN0Qyx5Q0FBbUU7QUFFbkUsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLHFCQUFTLENBQUMsZUFBTSxFQUFFLG1CQUFVLEVBQUUsbUJBQVUsRUFBRTtJQUMzRCxPQUFPLEVBQUUsT0FBTztJQUNoQixJQUFJLEVBQUUsYUFBSTtDQUNiLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlcXVlbGl6ZSB9IGZyb20gXCJzZXF1ZWxpemVcIjtcclxuaW1wb3J0IHsgZGJQYXNzd29yZCwgaG9zdCwgZGJVc2VybmFtZSwgZGJOYW1lfSBmcm9tIFwiLi4vLi4vY29uZmlnXCI7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBTZXF1ZWxpemUoZGJOYW1lLCBkYlVzZXJuYW1lLCBkYlBhc3N3b3JkLCB7XHJcbiAgICBkaWFsZWN0OiAnbXlzcWwnLFxyXG4gICAgaG9zdDogaG9zdFxyXG59KTtcclxuXHJcblxyXG4iXX0=