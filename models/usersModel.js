const { db } = require('../config/db.js');

const _registeUser = async (firstName, lastName, email, hashedPassword) => {
    try {
        return await db.transaction(async (trx) => {
            const userExists = await trx('users')
                .where({ email })
                .first();
            if (userExists) {
                return { success: false, message: 'User already exists' };
            }
            await trx('users').insert({
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: hashedPassword
            });
            return { success: true, message: 'user successfully created' };
        });
    } catch (error) {
        console.error('Transaction error:', error);
        return { success: false, message: `Error adding user: ${error.message}` };
    }
};

const _loginUser = async (email) => {
    try {
        return await db.transaction(async (trx) => {
            const userExists = await trx('users')
                .where({ email })
                .first();
            if (!userExists) {
                return { success: false, password: null, message: 'User does not exist' };
            }
            const user = await trx('users').select('first_name','last_name', 'email', 'password', 'user_id', 'profile_picture', 'hash_id', 'public_email').where({ email }).first();
            return { success: true, firstName: user.first_name, lastName: user.last_name, email: user.email, password: user.password, userId: user.user_id, profilePicture: user.profile_picture, hashId: user.hash_id, publicEmail: user.public_email };
        });
    } catch (error) {
        console.error('Transaction error:', error);
        return { success: false, message: `Error checking password: ${error.message}` };
    }
};

const _updateUser = async (firstName, lastName, email, publicEmail) => {
    try {
        return await db.transaction(async (trx) => {
            const userExists = await trx('users')
                .where({ email })
                .first();
            if (!userExists) {
                return { success: false, message: 'User does not exist' };
            }

            const user = await trx('users').update({first_name: firstName, last_name: lastName, public_email: publicEmail}).where({ email });
            return { success: true, firstName, lastName, publicEmail};
        });
    } catch (error) {
        console.error('Transaction error:', error);
        return { success: false, message: `Error updating user: ${error.message}` };
    }
};

const _updatePassword = async (email, hashedPassword) => {
    try {
        return await db.transaction(async (trx) => {
            const userExists = await trx('users')
                .where({ email })
                .first();
            if (!userExists) {
                return { success: false, message: 'User does not exist' };
            }
            const user = await trx('users').update({password: hashedPassword}).where({ email });
            return { success: true, message: 'password updated successfully'};
        });
    } catch (error) {
        console.error('Transaction error:', error);
        return { success: false, message: `Error updating password: ${error.message}` };
    }
};

const _updateProfilePicture = async (email, profilePicturePath) => {
    try {
        return await db.transaction(async (trx) => {
            const userExists = await trx('users').where({ email }).first();
            if (!userExists) {
                throw new Error('User not found');
            }
            await trx('users').where({ email }).update({ profile_picture: profilePicturePath });
        });
    } catch (error) {
        console.error("Error updating profile picture:", error);
        throw error;
    }
};

const _deleteUser = async (email) => {
    try {
        return await db.transaction(async (trx) => {
            const userExists = await trx('users')
                .where({ email })
                .first();
            if (!userExists) {
                return { success: false, message: 'User does not exist' };
            }
            await trx('users').where({email}).delete();
            return { success: true, message: 'User successfully deleted' };
        });
    } catch (error) {
        console.error('Transaction error:', error);
        return { success: false, message: `Error deleting user: ${error.message}` };
    }
};

const _getUserByHashId = async (hashId) => {
    try {
        return await db.transaction(async (trx) => {
            const user = await trx('users').where({ hash_id: hashId }).first();
            if (!user) {
                return { success: false, message: 'User not found' };
            }
            const userInfo = await trx('users')
            .select(
                'first_name',
                'last_name',
                'public_email',
                'profile_picture',
                'hash_id',
                'user_id',
            )
            .where({'hash_id': hashId});

            const links = await trx('links')
            .select(
                'url',
                'title',
                'display_order',
            )
            .where({'user_id': userInfo[0].user_id});

            return { success: true, user: userInfo[0], links };
        });
    } catch (error) {
        console.error('Transaction error:', error);
        return { success: false, message: `Error getting links: ${error}`};
    }
};

module.exports = {
    _registeUser,
    _loginUser,
    _updateUser,
    _updatePassword,
    _updateProfilePicture,
    _deleteUser,
    _getUserByHashId,
};