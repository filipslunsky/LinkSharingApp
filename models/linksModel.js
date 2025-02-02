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

// const _addLink = async (email, url, title, displayOrder) => {
//     try {
//         return await db.transaction(async (trx) => {
//             const user = await trx('users').where({ email }).first();
//             if (!user) {
//                 return { success: false, message: 'User not found' };
//             }
//             const link = await trx('links').insert({
//                 user_id: user.user_id,
//                 url,
//                 title,
//                 display_order: displayOrder,
//             }).returning('link_id', 'user_id', 'url', 'title', 'display_order');

//             return { success: true, message: 'link successfully added' };
//         });
//     } catch (error) {
//         console.error('Transaction error:', error);
//         return { succes: false, message: `Error adding link: ${error}`};
//     }
// };

// const _updateLink = async (linkId, url, title) => {
//     try {
//         return await db.transaction(async (trx) => {
//             const linkExists = await trx('links').where({ link_id: linkId }).first();
//             if (!linkExists) {
//                 return { success: false, message: 'Link not found' };
//             }
//             const link = await trx('links')
//             .update({ url, title})
//             .where({link_id: linkId});

//             return { success: true, message: 'Link successfully updated', linkId, url, title };
//         });
//     } catch (error) {
//         console.error('Transaction error:', error);
//         return { succes: false, message: `Error updating link: ${error}`};
//     }
// };

// const _updateLinksOrder = async (links) => {
//     return await db.transaction(async (trx) => {
//         try {
//             const resultArr = [];

//             const linkIds = links.map(link => link.linkId);
//             const existingLinks = await trx('links').whereIn('link_id', linkIds).select('link_id');

//             const existingLinkIds = existingLinks.map(link => link.link_id);
//             const missingLinks = linkIds.filter(id => !existingLinkIds.includes(id));

//             if (missingLinks.length > 0) {
//                 return {
//                     success: false,
//                     resultArr: missingLinks.map(id => ({
//                         success: false,
//                         message: `Link ${id} does not exist`,
//                     }))
//                 };
//             }

//             for (const link of links) {
//                 await trx('links')
//                     .update({ display_order: link.displayOrder })
//                     .where({ link_id: link.linkId });

//                 resultArr.push({ success: true, message: `Link ${link.linkId} order successfully updated` });
//             }

//             return { success: true, resultArr };
//         } catch (error) {
//             console.error('Transaction error:', error);
//             return { success: false, message: `Error updating links: ${error.message}` };
//         }
//     });
// };


// const _deleteLink = async (linkId) => {
//     try {
//         return await db.transaction(async (trx) => {
//             const linkExists = await trx('links')
//                 .where({ link_id: linkId })
//                 .first();
//             if (!linkExists) {
//                 return { success: false, message: 'Link does not exist' };
//             }
//             await trx('links').where({ link_id: linkId }).delete();
//             return { success: true, message: 'Link successfully deleted' };
//         });
//     } catch (error) {
//         console.error('Transaction error:', error);
//         return { success: false, message: `Error deleting link: ${error.message}` };
//     }
// };

const _updateAllLinks = async (links, email) => {
    return await db.transaction(async (trx) => {
        try {
            const user = await trx('users')
                .where({ email })
                .select('user_id')
                .first();

            if (!user) {
                return { success: false, message: 'User not found' };
            }

            const userId = user.user_id;

            const linksFromDB = await trx('links')
                .where({ user_id: userId })
                .select('link_id', 'user_id', 'url', 'title', 'display_order');

            const resultArr = [];
            const linksToUpdate = links.filter(link => link.link_id);
            const linksToInsert = links.filter(link => !link.link_id);

            for (const link of linksToUpdate) {
                await trx('links')
                    .where({ link_id: link.link_id, user_id: userId })
                    .update({
                        url: link.url,
                        title: link.title,
                        display_order: link.display_order
                    });

                resultArr.push({ success: true, message: `Link ${link.link_id} updated` });
            }

            for (const link of linksToInsert) {
                const [newLinkId] = await trx('links').insert({
                    user_id: userId,
                    url: link.url,
                    title: link.title,
                    display_order: link.display_order
                }).returning('link_id');

                resultArr.push({ success: true, message: `New link added with ID ${newLinkId}` });
            }

            const linkIdsFromDB = linksFromDB.map(link => link.link_id);
            const linkIdsFromRequest = links.map(link => link.link_id).filter(id => id);
            const linksToDelete = linkIdsFromDB.filter(id => !linkIdsFromRequest.includes(id));

            if (linksToDelete.length > 0) {
                await trx('links').whereIn('link_id', linksToDelete).del();
                linksToDelete.forEach(id => 
                    resultArr.push({ success: true, message: `Link ${id} deleted` })
                );
            }

            return { success: true, resultArr };
        } catch (error) {
            console.error('Transaction error:', error);
            return { success: false, message: `Error updating links: ${error.message}` };
        }
    });
};

module.exports = {
    _getAllLinks,
    // _addLink,
    // _updateLink,
    // _updateLinksOrder,
    // _deleteLink,
    _updateAllLinks,
};
