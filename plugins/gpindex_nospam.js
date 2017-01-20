'use strict';

var _e, comlib;

function processSpamCheck(msg, type, bot) {
    comlib.UserFlag.queryUserFlag(msg.new_chat_member.id, 'spam')
        .then((ret) => {
            if (ret) {
                _e.bot.kickChatMember(msg.chat.id, msg.new_chat_member.id)
                .then((ret) => {
                    _e.bot.sendMessage(msg.chat.id, '已检测到并尝试移除已知群发广告用户。', {
                        reply_to_message_id: msg.message_id
                    })
                }) 
                .catch((ret) => {
                    _e.bot.sendMessage(msg.chat.id, '已检测到已知群发广告用户。如需自动移除，请将机器人设置为管理员。', {
                        reply_to_message_id: msg.message_id
                    })
                })
            }
        });
}

module.exports = {
    init: (e) => {
        _e = e;
        comlib = _e.libs['gpindex_common'];
    },
    run: [
        ['new_chat_member', processSpamCheck]
    ]
}