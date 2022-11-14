declare namespace Express {
  export interface Request {
    user: import('../users/entities/user.entity').User;
    data: {
      user: import('../users/entities/user.entity').User;
      role: import('../roles/entities/role.entity').Role;
      template: import('../templates/entities/template.entity').Template;
      letter: import('../letters/entities/letter.entity').Letter;
    };
  }
}
