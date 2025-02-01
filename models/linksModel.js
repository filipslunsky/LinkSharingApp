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

            return { success: true, message: 'link successfully added' };
        });
    } catch (error) {
        console.error('Transaction error:', error);
        return { succes: false, message: `Error adding link: ${error}`};
    }
};

const _updateLink = async (linkId, url, title) => {
    try {
        return await db.transaction(async (trx) => {
            const linkExists = await trx('links').where({ link_id: linkId }).first();
            if (!linkExists) {
                return { success: false, message: 'Link not found' };
            }
            const link = await trx('links')
            .update({ url, title})
            .where({link_id: linkId});

            return { success: true, message: 'Link successfully updated', linkId, url, title };
        });
    } catch (error) {
        console.error('Transaction error:', error);
        return { succes: false, message: `Error updating link: ${error}`};
    }
};

const _updateLinksOrder = async (links) => {
    return await db.transaction(async (trx) => {
        try {
            const resultArr = [];

            const linkIds = links.map(link => link.linkId);
            const existingLinks = await trx('links').whereIn('link_id', linkIds).select('link_id');

            const existingLinkIds = existingLinks.map(link => link.link_id);
            const missingLinks = linkIds.filter(id => !existingLinkIds.includes(id));

            if (missingLinks.length > 0) {
                return {
                    success: false,
                    resultArr: missingLinks.map(id => ({
                        success: false,
                        message: `Link ${id} does not exist`,
                    }))
                };
            }

            for (const link of links) {
                await trx('links')
                    .update({ display_order: link.displayOrder })
                    .where({ link_id: link.linkId });

                resultArr.push({ success: true, message: `Link ${link.linkId} order successfully updated` });
            }

            return { success: true, resultArr };
        } catch (error) {
            console.error('Transaction error:', error);
            return { success: false, message: `Error updating links: ${error.message}` };
        }
    });
};


const _deleteLink = async (linkId) => {
    try {
        return await db.transaction(async (trx) => {
            const linkExists = await trx('links')
                .where({ link_id: linkId })
                .first();
            if (!linkExists) {
                return { success: false, message: 'Link does not exist' };
            }
            await trx('links').where({ link_id: linkId }).delete();
            return { success: true, message: 'Link successfully deleted' };
        });
    } catch (error) {
        console.error('Transaction error:', error);
        return { success: false, message: `Error deleting link: ${error.message}` };
    }
};

module.exports = {
    _getAllLinks,
    _addLink,
    _updateLink,
    _updateLinksOrder,
    _deleteLink,
};
