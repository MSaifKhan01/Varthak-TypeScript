"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleBase = void 0;
const RoleBase = (permittedRoles) => (req, res, next) => {
    const { x_userRole } = req.body;
    if (x_userRole.some((role) => permittedRoles.includes(role))) {
        next();
    }
    else {
        res.send("You are not authorized for this route");
    }
};
exports.RoleBase = RoleBase;
