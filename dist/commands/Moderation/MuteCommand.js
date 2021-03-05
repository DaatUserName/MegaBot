"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
const discord_js_1 = require("discord.js");
class BanCommand extends discord_akairo_1.Command {
    constructor() {
        super("mute", {
            aliases: ["mute"],
            category: "Moderation",
            description: {
                content: "mutes a member from the guild",
                usage: "mute [member] [reason]",
                examples: [
                    "mute @Nemijah#6391 swearing",
                    "mute Developer | Toby swearing"
                ]
            },
            ratelimit: 3,
            userPermissions: ["MANAGE_ROLES"],
            args: [
                {
                    id: "member",
                    type: "member",
                    prompt: {
                        start: (msg) => `${msg.author}, please provide a member to mute...`,
                        retry: (msg) => `${msg.author}, please provide a vaild member to mute...`
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
        const guild = message.guild;
        const role = guild.roles.cache.get('731884413994008676');
        if (member.roles.highest.position >= message.member.roles.highest.position && message.author.id != message.guild.ownerID)
            return message.channel.send(`${message.author.tag}. you're not allowed to mute ${member.user.tag}`);
        if (role) {
            member.roles.add(role);
            await message.channel.send(new discord_js_1.MessageEmbed()
                .setTitle(message.guild.name)
                .addFields({ name: "Member ", value: member.user.tag, inline: true }, { name: "Reason ", value: reason, inline: true }, { name: "Moderator ", value: message.author.tag, inline: false }, { name: "Moderator id ", value: message.author.id, inline: false })
                .setTimestamp()
                .setFooter(member.user.displayAvatarURL({ dynamic: true }) + member.user.tag + " has been banned")
                .setThumbnail(message.guild.iconURL({ dynamic: true })));
        }
        else {
            await message.channel.send(new discord_js_1.MessageEmbed()
                .setAuthor("**ERROR 404 **" + this.client.user.displayAvatarURL())
                .setDescription("Could not find the role name " + `${role.name}`)
                .setColor("DARK_RED"));
        }
    }
}
exports.default = BanCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXV0ZUNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvTW9kZXJhdGlvbi9NdXRlQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUF5QztBQUN6QywyQ0FBZ0U7QUFFaEUsTUFBcUIsVUFBVyxTQUFRLHdCQUFPO0lBQzNDO1FBQ0ksS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNWLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUNqQixRQUFRLEVBQUUsWUFBWTtZQUN0QixXQUFXLEVBQUU7Z0JBQ1QsT0FBTyxFQUFFLCtCQUErQjtnQkFDeEMsS0FBSyxFQUFFLHdCQUF3QjtnQkFDL0IsUUFBUSxFQUFFO29CQUNOLDZCQUE2QjtvQkFDN0IsZ0NBQWdDO2lCQUNuQzthQUNKO1lBQ0QsU0FBUyxFQUFFLENBQUM7WUFDWixlQUFlLEVBQUUsQ0FBQyxjQUFjLENBQUM7WUFDakMsSUFBSSxFQUFFO2dCQUNGO29CQUNJLEVBQUUsRUFBRSxRQUFRO29CQUNaLElBQUksRUFBRSxRQUFRO29CQUNkLE1BQU0sRUFBRTt3QkFDSixLQUFLLEVBQUUsQ0FBQyxHQUFZLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sc0NBQXNDO3dCQUM1RSxLQUFLLEVBQUUsQ0FBQyxHQUFZLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sNENBQTRDO3FCQUNyRjtpQkFDSjtnQkFDRDtvQkFDSSxFQUFFLEVBQUUsUUFBUTtvQkFDWixJQUFJLEVBQUUsUUFBUTtvQkFDZCxLQUFLLEVBQUUsTUFBTTtvQkFDYixPQUFPLEVBQUUsVUFBVTtpQkFDdEI7YUFDSjtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQWdCLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUEwQztRQUMxRixNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQzVCLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO1FBRXhELElBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPO1lBQ25ILE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsZ0NBQWdDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUV4RyxJQUFHLElBQUksRUFBRTtZQUNMLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSx5QkFBWSxFQUFFO2lCQUN4QyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7aUJBQzVCLFNBQVMsQ0FDTixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUMsRUFDeEQsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBQyxFQUMvQyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUMsRUFDL0QsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQ3BFO2lCQUNBLFlBQVksRUFBRTtpQkFDZCxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLGtCQUFrQixDQUFDO2lCQUNoRyxZQUFZLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUMxRCxDQUFDO1NBQ0w7YUFBTTtZQUNILE1BQU0sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSx5QkFBWSxFQUFFO2lCQUN4QyxTQUFTLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztpQkFDakUsY0FBYyxDQUFDLCtCQUErQixHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUNoRSxRQUFRLENBQUMsVUFBVSxDQUFDLENBQ3hCLENBQUM7U0FDTDtJQUNMLENBQUM7Q0FDSjtBQS9ERCw2QkErREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcImRpc2NvcmQtYWthaXJvXCI7XHJcbmltcG9ydCB7IE1lc3NhZ2UsIE1lc3NhZ2VFbWJlZCwgR3VpbGRNZW1iZXIgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFuQ29tbWFuZCBleHRlbmRzIENvbW1hbmQge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoXCJtdXRlXCIsIHtcclxuICAgICAgICAgICAgYWxpYXNlczogW1wibXV0ZVwiXSxcclxuICAgICAgICAgICAgY2F0ZWdvcnk6IFwiTW9kZXJhdGlvblwiLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgY29udGVudDogXCJtdXRlcyBhIG1lbWJlciBmcm9tIHRoZSBndWlsZFwiLFxyXG4gICAgICAgICAgICAgICAgdXNhZ2U6IFwibXV0ZSBbbWVtYmVyXSBbcmVhc29uXVwiLFxyXG4gICAgICAgICAgICAgICAgZXhhbXBsZXM6IFtcclxuICAgICAgICAgICAgICAgICAgICBcIm11dGUgQE5lbWlqYWgjNjM5MSBzd2VhcmluZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibXV0ZSBEZXZlbG9wZXIgfCBUb2J5IHN3ZWFyaW5nXCJcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmF0ZWxpbWl0OiAzLFxyXG4gICAgICAgICAgICB1c2VyUGVybWlzc2lvbnM6IFtcIk1BTkFHRV9ST0xFU1wiXSxcclxuICAgICAgICAgICAgYXJnczogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIm1lbWJlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibWVtYmVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvbXB0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiAobXNnOiBNZXNzYWdlKSA9PiBgJHttc2cuYXV0aG9yfSwgcGxlYXNlIHByb3ZpZGUgYSBtZW1iZXIgdG8gbXV0ZS4uLmAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHJ5OiAobXNnOiBNZXNzYWdlKSA9PiBgJHttc2cuYXV0aG9yfSwgcGxlYXNlIHByb3ZpZGUgYSB2YWlsZCBtZW1iZXIgdG8gbXV0ZS4uLmBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcInJlYXNvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2g6IFwicmVzdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IFwic3dlYXJpbmdcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGV4ZWMobWVzc2FnZTogTWVzc2FnZSwgeyBtZW1iZXIsIHJlYXNvbiB9OiB7IG1lbWJlcjogR3VpbGRNZW1iZXIsIHJlYXNvbjogc3RyaW5nfSk6IFByb21pc2U8TWVzc2FnZT4ge1xyXG4gICAgICAgIGNvbnN0IGd1aWxkID0gbWVzc2FnZS5ndWlsZDtcclxuICAgICAgICBjb25zdCByb2xlID0gZ3VpbGQucm9sZXMuY2FjaGUuZ2V0KCc3MzE4ODQ0MTM5OTQwMDg2NzYnKVxyXG5cclxuICAgICAgICBpZihtZW1iZXIucm9sZXMuaGlnaGVzdC5wb3NpdGlvbiA+PSBtZXNzYWdlLm1lbWJlci5yb2xlcy5oaWdoZXN0LnBvc2l0aW9uICYmIG1lc3NhZ2UuYXV0aG9yLmlkICE9IG1lc3NhZ2UuZ3VpbGQub3duZXJJRClcclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKGAke21lc3NhZ2UuYXV0aG9yLnRhZ30uIHlvdSdyZSBub3QgYWxsb3dlZCB0byBtdXRlICR7bWVtYmVyLnVzZXIudGFnfWApO1xyXG5cclxuICAgICAgICBpZihyb2xlKSB7XHJcbiAgICAgICAgICAgIG1lbWJlci5yb2xlcy5hZGQocm9sZSk7XHJcbiAgICAgICAgICAgIGF3YWl0IG1lc3NhZ2UuY2hhbm5lbC5zZW5kKG5ldyBNZXNzYWdlRW1iZWQoKVxyXG4gICAgICAgICAgICAgICAgLnNldFRpdGxlKG1lc3NhZ2UuZ3VpbGQubmFtZSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZHMoXHJcbiAgICAgICAgICAgICAgICAgICAgeyBuYW1lOiBcIk1lbWJlciBcIiwgdmFsdWU6IG1lbWJlci51c2VyLnRhZywgaW5saW5lOiB0cnVlfSxcclxuICAgICAgICAgICAgICAgICAgICB7IG5hbWU6IFwiUmVhc29uIFwiLCB2YWx1ZTogcmVhc29uLCBpbmxpbmU6IHRydWV9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgbmFtZTogXCJNb2RlcmF0b3IgXCIsIHZhbHVlOiBtZXNzYWdlLmF1dGhvci50YWcsIGlubGluZTogZmFsc2V9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgbmFtZTogXCJNb2RlcmF0b3IgaWQgXCIsIHZhbHVlOiBtZXNzYWdlLmF1dGhvci5pZCwgaW5saW5lOiBmYWxzZX0sXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAuc2V0VGltZXN0YW1wKClcclxuICAgICAgICAgICAgICAgIC5zZXRGb290ZXIobWVtYmVyLnVzZXIuZGlzcGxheUF2YXRhclVSTCh7IGR5bmFtaWM6IHRydWV9KSArIG1lbWJlci51c2VyLnRhZyArIFwiIGhhcyBiZWVuIGJhbm5lZFwiKVxyXG4gICAgICAgICAgICAgICAgLnNldFRodW1ibmFpbChtZXNzYWdlLmd1aWxkLmljb25VUkwoeyBkeW5hbWljOiB0cnVlIH0pKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGF3YWl0IG1lc3NhZ2UuY2hhbm5lbC5zZW5kKG5ldyBNZXNzYWdlRW1iZWQoKVxyXG4gICAgICAgICAgICAgICAgLnNldEF1dGhvcihcIioqRVJST1IgNDA0ICoqXCIgKyB0aGlzLmNsaWVudC51c2VyLmRpc3BsYXlBdmF0YXJVUkwoKSlcclxuICAgICAgICAgICAgICAgIC5zZXREZXNjcmlwdGlvbihcIkNvdWxkIG5vdCBmaW5kIHRoZSByb2xlIG5hbWUgXCIgKyBgJHtyb2xlLm5hbWV9YClcclxuICAgICAgICAgICAgICAgIC5zZXRDb2xvcihcIkRBUktfUkVEXCIpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19