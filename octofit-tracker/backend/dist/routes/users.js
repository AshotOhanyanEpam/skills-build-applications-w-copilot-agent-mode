"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (_req, res) => {
    res.json({
        message: 'Users endpoint',
        users: [
            { id: 1, name: 'Ava', role: 'admin' },
            { id: 2, name: 'Ben', role: 'member' },
        ],
    });
});
exports.default = router;
