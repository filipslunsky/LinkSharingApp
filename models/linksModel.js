const { db } = require('../config/db.js');

const _getAllLinks = async (email) => {
    try {
        return await db.transaction(async (trx) => {
            const user = await trx('users').where({ email }).first();
            if (!user) {
                return { success: false, message: 'User not found' };
            }
            const links = await trx('links')
            .select('link_id', 'user_id', 'url', 'title', 'display_order')
            .where({user_id: user.user_id});

            return { success: true, links };
        });
    } catch (error) {
        console.error('Transaction error:', error);
        return { succes: false, message: `Error getting links: ${error}`};
    }
};

const _addLink = async (email, url, title, displayOrder) => {
    try {
        return await db.transaction(async (trx) => {
            const user = await trx('users').where({ email }).first();
            if (!user) {
                return { success: false, message: 'User not found' };
            }
            const link = await trx('links').insert({
                user_id: user.user_id,
                url,
                title,
                display_order: displayOrder,
            }).returning('link_id', 'user_id', 'url', 'title', 'display_order');

            return { succes: true, message: 'link successfully added' };
        });
    } catch (error) {
        console.error('Transaction error:', error);
        return { succes: false, message: `Error adding link: ${error}`};
    }
};

const _updateLink = async () => {};

const _updateLinksOrder = async () => {};

const _deleteLink = async () => {};

module.exports = {
    _getAllLinks,
    _addLink,
    _updateLink,
    _updateLinksOrder,
    _deleteLink,
};
