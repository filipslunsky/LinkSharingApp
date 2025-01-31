const {
    _getAllLinks,
    _addLink,
    _updateLink,
    _updateLinksOrder,
    _deleteLink,
} = require('../models/linksModel.js');

const getAllLinks = async (req, res) => {};

const addLink = async (req, res) => {
    const { email, url, title, displayOrder } = req.body;
    try {
        const data = await _addLink(email, url, title, displayOrder);
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        };
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateLink = async (req, res) => {};

const updateLinksOrder = async (req, res) => {};

const deleteLink = async (req, res) => {};

module.exports = {
    getAllLinks,
    addLink,
    updateLink,
    updateLinksOrder,
    deleteLink,
};
