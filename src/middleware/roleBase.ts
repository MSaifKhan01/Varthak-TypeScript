import { Request, Response, NextFunction } from "express";



const RoleBase = (permittedRoles: string[]) => (req:Request, res:Response, next:NextFunction) => {
  const { x_userRole } = req.body;
  if (x_userRole.some((role:string) => permittedRoles.includes(role))) {
    next();
  } else {
    res.send("You are not authorized for this route");
  }
};

export { RoleBase };