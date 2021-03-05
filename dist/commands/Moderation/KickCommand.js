"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
const discord_js_1 = require("discord.js");
const Kicks_1 = require("../../database/Models/Kicks");
class KickCommand extends discord_akairo_1.Command {
    constructor(props) {
        super("kick", {
            aliases: ["boot", "kick"],
            category: "Moderation",
            description: {
                content: "Kicks a member from the guild and saves it into the database..",
                usage: "kick [ user ] [ reason ]",
                examples: [
                    "kick Nemijah#6392 disrespectful towards staff",
                    "kick Toby disrespectful towards staff"
                ]
            },
            userPermissions: ["KICK_MEMBERS"],
            ratelimit: 3,
            args: [
                {
                    id: "member",
                    type: "member",
                    prompt: {
                        start: (msg) => `${msg.author}, please provide a member to kick`,
                        retry: (msg) => `${msg.author}, please provide a vaild member to warn...`
                    }
                },
                {
                    id: "reason",
                    type: "string",
                    match: "rest",
                    default: "disrespectful towards staff"
                }
            ]
        });
    }
    async exec(message, { member, reason }) {
        const kickRepo = this.client.db.getRepository(Kicks_1.Kicks);
        if (member.roles.highest.position >= message.member.roles.highest.position && message.author.id != message.guild.ownerID)
            return message.channel.send(`${message.author.tag}. you're not allowed to kick ${member.user.tag}`);
        await member.kick();
        await message.channel.send(new discord_js_1.MessageEmbed()
            .setTitle(message.guild.name)
            .addFields({ name: "Member ", value: member.user.tag, inline: true }, { name: "Reason ", value: reason, inline: true }, { name: "Moderator ", value: message.author.tag, inline: false }, { name: "Moderator id ", value: message.author.id, inline: false })
            .setTimestamp()
            .setFooter(member.user.displayAvatarURL({ dynamic: true }) + member.user.tag + " has been kicked")
            .setThumbnail(message.guild.iconURL({ dynamic: true })));
        await kickRepo.insert({
            guild: message.guild.id,
            user: member.id,
            moderator: message.author.id,
            reason: reason
        });
    }
}
exports.default = KickCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2lja0NvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvTW9kZXJhdGlvbi9LaWNrQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUF5QztBQUN6QywyQ0FBZ0U7QUFFaEUsdURBQXFEO0FBRXJELE1BQXFCLFdBQVksU0FBUyx3QkFBTztJQUM3QyxZQUFZLEtBQUs7UUFDYixLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ1YsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztZQUN6QixRQUFRLEVBQUUsWUFBWTtZQUN0QixXQUFXLEVBQUU7Z0JBQ1QsT0FBTyxFQUFFLGdFQUFnRTtnQkFDekUsS0FBSyxFQUFFLDBCQUEwQjtnQkFDakMsUUFBUSxFQUFFO29CQUNOLCtDQUErQztvQkFDL0MsdUNBQXVDO2lCQUMxQzthQUNKO1lBQ0QsZUFBZSxFQUFFLENBQUMsY0FBYyxDQUFDO1lBQ2pDLFNBQVMsRUFBRSxDQUFDO1lBQ1osSUFBSSxFQUFFO2dCQUNGO29CQUNJLEVBQUUsRUFBRSxRQUFRO29CQUNaLElBQUksRUFBRSxRQUFRO29CQUNkLE1BQU0sRUFBRTt3QkFDSixLQUFLLEVBQUUsQ0FBQyxHQUFZLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sbUNBQW1DO3dCQUN6RSxLQUFLLEVBQUUsQ0FBQyxHQUFZLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sNENBQTRDO3FCQUNyRjtpQkFDSjtnQkFDRDtvQkFDSSxFQUFFLEVBQUUsUUFBUTtvQkFDWixJQUFJLEVBQUUsUUFBUTtvQkFDZCxLQUFLLEVBQUUsTUFBTTtvQkFDYixPQUFPLEVBQUUsNkJBQTZCO2lCQUN6QzthQUNKO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBZ0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQTJDO1FBQzNGLE1BQU0sUUFBUSxHQUFzQixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsYUFBSyxDQUFDLENBQUM7UUFFeEUsSUFBRyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU87WUFDbkgsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxnQ0FBZ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBR3hHLE1BQU0sTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRXBCLE1BQU0sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSx5QkFBWSxFQUFFO2FBQ3hDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzthQUM1QixTQUFTLENBQ04sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDLEVBQ3hELEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUMsRUFDL0MsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFDLEVBQy9ELEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBQyxDQUNwRTthQUNBLFlBQVksRUFBRTthQUNkLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsa0JBQWtCLENBQUM7YUFDaEcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FDMUQsQ0FBQztRQUdGLE1BQU0sUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUNsQixLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3ZCLElBQUksRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNmLFNBQVMsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDNUIsTUFBTSxFQUFFLE1BQU07U0FDakIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBaEVELDhCQWdFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1hbmQgfSBmcm9tICdkaXNjb3JkLWFrYWlybyc7XHJcbmltcG9ydCB7IE1lc3NhZ2VFbWJlZCwgTWVzc2FnZSwgR3VpbGRNZW1iZXIgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xyXG5pbXBvcnQgeyBSZXBvc2l0b3J5IH0gZnJvbSAndHlwZW9ybSc7XHJcbmltcG9ydCAgeyBLaWNrcyB9IGZyb20gXCIuLi8uLi9kYXRhYmFzZS9Nb2RlbHMvS2lja3NcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEtpY2tDb21tYW5kIGV4dGVuZHMgIENvbW1hbmQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihcImtpY2tcIiwge1xyXG4gICAgICAgICAgICBhbGlhc2VzOiBbXCJib290XCIsIFwia2lja1wiXSxcclxuICAgICAgICAgICAgY2F0ZWdvcnk6IFwiTW9kZXJhdGlvblwiLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgY29udGVudDogXCJLaWNrcyBhIG1lbWJlciBmcm9tIHRoZSBndWlsZCBhbmQgc2F2ZXMgaXQgaW50byB0aGUgZGF0YWJhc2UuLlwiLFxyXG4gICAgICAgICAgICAgICAgdXNhZ2U6IFwia2ljayBbIHVzZXIgXSBbIHJlYXNvbiBdXCIsXHJcbiAgICAgICAgICAgICAgICBleGFtcGxlczogW1xyXG4gICAgICAgICAgICAgICAgICAgIFwia2ljayBOZW1pamFoIzYzOTIgZGlzcmVzcGVjdGZ1bCB0b3dhcmRzIHN0YWZmXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJraWNrIFRvYnkgZGlzcmVzcGVjdGZ1bCB0b3dhcmRzIHN0YWZmXCJcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdXNlclBlcm1pc3Npb25zOiBbXCJLSUNLX01FTUJFUlNcIl0sXHJcbiAgICAgICAgICAgIHJhdGVsaW1pdDogMyxcclxuICAgICAgICAgICAgYXJnczogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIm1lbWJlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibWVtYmVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvbXB0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiAobXNnOiBNZXNzYWdlKSA9PiBgJHttc2cuYXV0aG9yfSwgcGxlYXNlIHByb3ZpZGUgYSBtZW1iZXIgdG8ga2lja2AsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHJ5OiAobXNnOiBNZXNzYWdlKSA9PiBgJHttc2cuYXV0aG9yfSwgcGxlYXNlIHByb3ZpZGUgYSB2YWlsZCBtZW1iZXIgdG8gd2Fybi4uLmBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcInJlYXNvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2g6IFwicmVzdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IFwiZGlzcmVzcGVjdGZ1bCB0b3dhcmRzIHN0YWZmXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBleGVjKG1lc3NhZ2U6IE1lc3NhZ2UsIHsgbWVtYmVyLCByZWFzb24gfTogeyBtZW1iZXI6IEd1aWxkTWVtYmVyLCByZWFzb246IHN0cmluZyB9KTogUHJvbWlzZTxNZXNzYWdlPiB7XHJcbiAgICAgICAgY29uc3Qga2lja1JlcG86IFJlcG9zaXRvcnk8S2lja3M+ID0gdGhpcy5jbGllbnQuZGIuZ2V0UmVwb3NpdG9yeShLaWNrcyk7XHJcblxyXG4gICAgICAgIGlmKG1lbWJlci5yb2xlcy5oaWdoZXN0LnBvc2l0aW9uID49IG1lc3NhZ2UubWVtYmVyLnJvbGVzLmhpZ2hlc3QucG9zaXRpb24gJiYgbWVzc2FnZS5hdXRob3IuaWQgIT0gbWVzc2FnZS5ndWlsZC5vd25lcklEKVxyXG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZS5jaGFubmVsLnNlbmQoYCR7bWVzc2FnZS5hdXRob3IudGFnfS4geW91J3JlIG5vdCBhbGxvd2VkIHRvIGtpY2sgJHttZW1iZXIudXNlci50YWd9YCk7XHJcblxyXG5cclxuICAgICAgICBhd2FpdCBtZW1iZXIua2ljaygpO1xyXG5cclxuICAgICAgICBhd2FpdCBtZXNzYWdlLmNoYW5uZWwuc2VuZChuZXcgTWVzc2FnZUVtYmVkKClcclxuICAgICAgICAgICAgLnNldFRpdGxlKG1lc3NhZ2UuZ3VpbGQubmFtZSlcclxuICAgICAgICAgICAgLmFkZEZpZWxkcyhcclxuICAgICAgICAgICAgICAgIHsgbmFtZTogXCJNZW1iZXIgXCIsIHZhbHVlOiBtZW1iZXIudXNlci50YWcsIGlubGluZTogdHJ1ZX0sXHJcbiAgICAgICAgICAgICAgICB7IG5hbWU6IFwiUmVhc29uIFwiLCB2YWx1ZTogcmVhc29uLCBpbmxpbmU6IHRydWV9LFxyXG4gICAgICAgICAgICAgICAgeyBuYW1lOiBcIk1vZGVyYXRvciBcIiwgdmFsdWU6IG1lc3NhZ2UuYXV0aG9yLnRhZywgaW5saW5lOiBmYWxzZX0sXHJcbiAgICAgICAgICAgICAgICB7IG5hbWU6IFwiTW9kZXJhdG9yIGlkIFwiLCB2YWx1ZTogbWVzc2FnZS5hdXRob3IuaWQsIGlubGluZTogZmFsc2V9LFxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5zZXRUaW1lc3RhbXAoKVxyXG4gICAgICAgICAgICAuc2V0Rm9vdGVyKG1lbWJlci51c2VyLmRpc3BsYXlBdmF0YXJVUkwoeyBkeW5hbWljOiB0cnVlfSkgKyBtZW1iZXIudXNlci50YWcgKyBcIiBoYXMgYmVlbiBraWNrZWRcIilcclxuICAgICAgICAgICAgLnNldFRodW1ibmFpbChtZXNzYWdlLmd1aWxkLmljb25VUkwoeyBkeW5hbWljOiB0cnVlIH0pKVxyXG4gICAgICAgICk7XHJcblxyXG5cclxuICAgICAgICBhd2FpdCBraWNrUmVwby5pbnNlcnQoe1xyXG4gICAgICAgICAgICBndWlsZDogbWVzc2FnZS5ndWlsZC5pZCxcclxuICAgICAgICAgICAgdXNlcjogbWVtYmVyLmlkLFxyXG4gICAgICAgICAgICBtb2RlcmF0b3I6IG1lc3NhZ2UuYXV0aG9yLmlkLFxyXG4gICAgICAgICAgICByZWFzb246IHJlYXNvblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59Il19