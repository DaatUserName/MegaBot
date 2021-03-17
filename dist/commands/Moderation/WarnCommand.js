"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
const discord_js_1 = require("discord.js");
const warnConfig = require('../../database/MySQL/Models/WarnConfig');
class WarnCommand extends discord_akairo_1.Command {
    constructor() {
        super("warn", {
            aliases: ["warn", "w"],
            category: "Moderation",
            description: {
                content: "warns a member",
                usage: "warn [ member ] [ reason ]",
                examples: [
                    "warn @Nemijah#6301 swearing",
                    "warn Toby swearing"
                ]
            },
            ratelimit: 3,
            userPermissions: ["MANAGE_MESSAGES"],
            args: [
                {
                    id: "member",
                    type: "member",
                    prompt: {
                        start: (msg) => `${msg.author}, please provide a member to warn...`,
                        retry: (msg) => `${msg.author}, please provide a vaild member to warn...`
                    }
                },
                {
                    id: "reason",
                    type: "string",
                    match: "rest",
                    default: "swearing"
                }
            ]
        });
    }
    async exec(message, { member, reason }) {
        if (member.roles.highest.position >= message.member.roles.highest.position && message.author.id != message.guild.ownerID)
            return message.channel.send(`${message.author.tag}. you're not allowed to warn ${member.user.tag}`);
        const CaseId = await warnConfig.findOne({ where: { id: this.id } });
        const embed = new discord_js_1.MessageEmbed()
            .setTitle(`Moderation: Warn [CaseID: ${CaseId}]**`)
            .addField("Member ", member.user.tag, true)
            .addField("Reason ", reason, true)
            .addField("Moderator ", message.author.tag, false)
            .addField("Moderator id ", message.author.id, false)
            .setTimestamp()
            .setFooter(`©️by ${message.guild.iconURL()}`)
            .setColor("#ff0000")
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: 'png' }));
        await message.channel.send(embed);
        await warnConfig.create({
            user: member.user.tag,
            userId: member.id,
            reason: reason,
            moderator: message.author.tag,
            moderatorId: message.author.id,
            active: true,
        });
    }
}
exports.default = WarnCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2FybkNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvTW9kZXJhdGlvbi9XYXJuQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUEwQztBQUMxQywyQ0FBOEQ7QUFDOUQsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7QUFFckUsTUFBcUIsV0FBWSxTQUFRLHdCQUFPO0lBQzVDO1FBQ0ksS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNWLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUM7WUFDdEIsUUFBUSxFQUFFLFlBQVk7WUFDdEIsV0FBVyxFQUFFO2dCQUNULE9BQU8sRUFBRSxnQkFBZ0I7Z0JBQ3pCLEtBQUssRUFBRSw0QkFBNEI7Z0JBQ25DLFFBQVEsRUFBRTtvQkFDTiw2QkFBNkI7b0JBQzdCLG9CQUFvQjtpQkFDdkI7YUFDSjtZQUNELFNBQVMsRUFBRSxDQUFDO1lBQ1osZUFBZSxFQUFFLENBQUMsaUJBQWlCLENBQUM7WUFDcEMsSUFBSSxFQUFFO2dCQUNGO29CQUNJLEVBQUUsRUFBRSxRQUFRO29CQUNaLElBQUksRUFBRSxRQUFRO29CQUNkLE1BQU0sRUFBRTt3QkFDSixLQUFLLEVBQUUsQ0FBQyxHQUFZLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sc0NBQXNDO3dCQUM1RSxLQUFLLEVBQUUsQ0FBQyxHQUFZLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sNENBQTRDO3FCQUNyRjtpQkFDSjtnQkFDRDtvQkFDSSxFQUFFLEVBQUUsUUFBUTtvQkFDWixJQUFJLEVBQUUsUUFBUTtvQkFDZCxLQUFLLEVBQUUsTUFBTTtvQkFDYixPQUFPLEVBQUUsVUFBVTtpQkFDdEI7YUFDSjtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTSxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQWdCLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUF5QztRQUMxRixJQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTztZQUNsSCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLGdDQUFnQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFFekcsTUFBTSxNQUFNLEdBQUcsTUFBTSxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBQyxDQUFDLENBQUM7UUFFbkUsTUFBTSxLQUFLLEdBQUcsSUFBSSx5QkFBWSxFQUFFO2FBQzNCLFFBQVEsQ0FBQyw2QkFBNkIsTUFBTSxLQUFLLENBQUM7YUFDbEQsUUFBUSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUM7YUFDMUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDO2FBQ2pDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUcsS0FBSyxDQUFDO2FBQ2xELFFBQVEsQ0FBRSxlQUFlLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDO2FBQ3BELFlBQVksRUFBRTthQUNkLFNBQVMsQ0FBQyxRQUFRLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQzthQUM1QyxRQUFRLENBQUMsU0FBUyxDQUFDO2FBQ25CLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRWxGLE1BQU0sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFakMsTUFBTSxVQUFVLENBQUMsTUFBTSxDQUFDO1lBQ3BCLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUc7WUFDckIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ2pCLE1BQU0sRUFBRSxNQUFNO1lBQ2QsU0FBUyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRztZQUM3QixXQUFXLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzlCLE1BQU0sRUFBRSxJQUFJO1NBQ2YsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBN0RELDhCQTZEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAgeyBDb21tYW5kIH0gZnJvbSAnZGlzY29yZC1ha2Fpcm8nO1xyXG5pbXBvcnQge01lc3NhZ2UsIEd1aWxkTWVtYmVyLCBNZXNzYWdlRW1iZWR9IGZyb20gXCJkaXNjb3JkLmpzXCI7XHJcbmNvbnN0IHdhcm5Db25maWcgPSByZXF1aXJlKCcuLi8uLi9kYXRhYmFzZS9NeVNRTC9Nb2RlbHMvV2FybkNvbmZpZycpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2FybkNvbW1hbmQgZXh0ZW5kcyBDb21tYW5kIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFwid2FyblwiLCB7XHJcbiAgICAgICAgICAgIGFsaWFzZXM6IFtcIndhcm5cIiwgXCJ3XCJdLFxyXG4gICAgICAgICAgICBjYXRlZ29yeTogXCJNb2RlcmF0aW9uXCIsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiBcIndhcm5zIGEgbWVtYmVyXCIsXHJcbiAgICAgICAgICAgICAgICB1c2FnZTogXCJ3YXJuIFsgbWVtYmVyIF0gWyByZWFzb24gXVwiLFxyXG4gICAgICAgICAgICAgICAgZXhhbXBsZXM6IFtcclxuICAgICAgICAgICAgICAgICAgICBcIndhcm4gQE5lbWlqYWgjNjMwMSBzd2VhcmluZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwid2FybiBUb2J5IHN3ZWFyaW5nXCJcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmF0ZWxpbWl0OiAzLFxyXG4gICAgICAgICAgICB1c2VyUGVybWlzc2lvbnM6IFtcIk1BTkFHRV9NRVNTQUdFU1wiXSxcclxuICAgICAgICAgICAgYXJnczogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIm1lbWJlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibWVtYmVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvbXB0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiAobXNnOiBNZXNzYWdlKSA9PiBgJHttc2cuYXV0aG9yfSwgcGxlYXNlIHByb3ZpZGUgYSBtZW1iZXIgdG8gd2Fybi4uLmAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHJ5OiAobXNnOiBNZXNzYWdlKSA9PiBgJHttc2cuYXV0aG9yfSwgcGxlYXNlIHByb3ZpZGUgYSB2YWlsZCBtZW1iZXIgdG8gd2Fybi4uLmBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcInJlYXNvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2g6IFwicmVzdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IFwic3dlYXJpbmdcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYXN5bmMgZXhlYyhtZXNzYWdlOiBNZXNzYWdlLCB7IG1lbWJlciwgcmVhc29ufTogeyBtZW1iZXI6IEd1aWxkTWVtYmVyLCByZWFzb246IHN0cmluZ30pOiBQcm9taXNlPE1lc3NhZ2U+IHtcclxuICAgICAgIGlmKG1lbWJlci5yb2xlcy5oaWdoZXN0LnBvc2l0aW9uID49IG1lc3NhZ2UubWVtYmVyLnJvbGVzLmhpZ2hlc3QucG9zaXRpb24gJiYgbWVzc2FnZS5hdXRob3IuaWQgIT0gbWVzc2FnZS5ndWlsZC5vd25lcklEKVxyXG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZS5jaGFubmVsLnNlbmQoYCR7bWVzc2FnZS5hdXRob3IudGFnfS4geW91J3JlIG5vdCBhbGxvd2VkIHRvIHdhcm4gJHttZW1iZXIudXNlci50YWd9YCk7XHJcblxyXG4gICAgICAgY29uc3QgQ2FzZUlkID0gYXdhaXQgd2FybkNvbmZpZy5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHRoaXMuaWQgfX0pO1xyXG5cclxuICAgICAgIGNvbnN0IGVtYmVkID0gbmV3IE1lc3NhZ2VFbWJlZCgpXHJcbiAgICAgICAgICAgLnNldFRpdGxlKGBNb2RlcmF0aW9uOiBXYXJuIFtDYXNlSUQ6ICR7Q2FzZUlkfV0qKmApXHJcbiAgICAgICAgICAgLmFkZEZpZWxkKFwiTWVtYmVyIFwiLCBtZW1iZXIudXNlci50YWcsIHRydWUpXHJcbiAgICAgICAgICAgLmFkZEZpZWxkKFwiUmVhc29uIFwiLCByZWFzb24sIHRydWUpXHJcbiAgICAgICAgICAgLmFkZEZpZWxkKFwiTW9kZXJhdG9yIFwiLCBtZXNzYWdlLmF1dGhvci50YWcsICBmYWxzZSlcclxuICAgICAgICAgICAuYWRkRmllbGQoIFwiTW9kZXJhdG9yIGlkIFwiLCBtZXNzYWdlLmF1dGhvci5pZCwgZmFsc2UpXHJcbiAgICAgICAgICAgLnNldFRpbWVzdGFtcCgpXHJcbiAgICAgICAgICAgLnNldEZvb3RlcihgwqnvuI9ieSAke21lc3NhZ2UuZ3VpbGQuaWNvblVSTCgpfWApXHJcbiAgICAgICAgICAgLnNldENvbG9yKFwiI2ZmMDAwMFwiKVxyXG4gICAgICAgICAgIC5zZXRUaHVtYm5haWwobWVtYmVyLnVzZXIuZGlzcGxheUF2YXRhclVSTCh7IGR5bmFtaWM6IHRydWUsIGZvcm1hdDogJ3BuZycgfSkpO1xyXG5cclxuICAgICAgIGF3YWl0IG1lc3NhZ2UuY2hhbm5lbC5zZW5kKGVtYmVkKTtcclxuXHJcbiAgICAgICAgYXdhaXQgd2FybkNvbmZpZy5jcmVhdGUoe1xyXG4gICAgICAgICAgICB1c2VyOiBtZW1iZXIudXNlci50YWcsXHJcbiAgICAgICAgICAgIHVzZXJJZDogbWVtYmVyLmlkLFxyXG4gICAgICAgICAgICByZWFzb246IHJlYXNvbixcclxuICAgICAgICAgICAgbW9kZXJhdG9yOiBtZXNzYWdlLmF1dGhvci50YWcsXHJcbiAgICAgICAgICAgIG1vZGVyYXRvcklkOiBtZXNzYWdlLmF1dGhvci5pZCxcclxuICAgICAgICAgICAgYWN0aXZlOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59Il19