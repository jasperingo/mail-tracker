declare namespace Express {
  export interface Request {
    user: import('../users/entities/user.entity').User;
    data: {
      user: import('../users/entities/user.entity').User;
      role: import('../roles/entities/role.entity').Role;
    };
  }
}
