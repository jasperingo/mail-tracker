declare namespace Express {
  export interface Request {
    user: import('../users/entities/user.entity').User;
    data: {
      user: import('../users/entities/user.entity').User;
    };
  }
}
