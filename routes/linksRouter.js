const { Router } = require('express');
const { authenticateLoginToken } = require('../middlewares/authenticate.js');
const {
    getAllLinks,
    addLink,
    updateLink,
    updateLinksOrder,
    deleteLink,
} = require('../controllers/linksController.js');

const linksRouter = Router();

linksRouter.post('/all', authenticateLoginToken, getAllLinks);
linksRouter.post('/new', authenticateLoginToken, addLink);

module.exports = linksRouter;
