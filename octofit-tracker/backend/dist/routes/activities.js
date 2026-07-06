"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (_req, res) => {
    res.json({
        message: 'Activities endpoint',
        activities: [{ id: 1, type: 'run', duration: 30 }],
    });
});
exports.default = router;
