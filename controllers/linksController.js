const {
    _getAllLinks,
    // _addLink,
    // _updateLink,
    // _updateLinksOrder,
    // _deleteLink,
    _updateAllLinks
} = require('../models/linksModel.js');

const getAllLinks = async (req, res) => {
    const { email } = req.body;
    try {
        const data = await _getAllLinks(email);
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

// const addLink = async (req, res) => {
//     const { email, url, title, displayOrder } = req.body;
//     try {
//         const data = await _addLink(email, url, title, displayOrder);
//         if (data.success) {
//             res.status(200).json(data);
//         } else {
//             res.status(400).json(data);
//         };
//     } catch (error) {
//         console.log('Error:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

// const updateLink = async (req, res) => {
//     const { linkId, url, title } = req.body;
//     try {
//         const data = await _updateLink(linkId, url, title);
//         if (data.success) {
//             res.status(200).json(data);
//         } else {
//             res.status(400).json(data);
//         };
//     } catch (error) {
//         console.log('Error:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

// const updateLinksOrder = async (req, res) => {
//     const { links } = req.body;
//     try {
//         const data = await _updateLinksOrder(links);
//         if (data.success) {
//             res.status(200).json(data);
//         } else {
//             res.status(400).json(data);
//         };
//     } catch (error) {
//         console.log('Error:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

// const deleteLink = async (req, res) => {
//     const { linkId } = req.body;
//     try {
//         const data = await _deleteLink(linkId);
//         if (data.success) {
//             res.status(200).json(data);
//         } else {
//             res.status(400).json(data);
//         };
//     } catch (error) {
//         console.log('Error:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

const updateAllLinks = async (req, res) => {
    const { links, email } = req.body;
    try {
        const data = await _updateAllLinks(links, email);
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

module.exports = {
    getAllLinks,
    // addLink,
    // updateLink,
    // updateLinksOrder,
    // deleteLink,
    updateAllLinks,
};
