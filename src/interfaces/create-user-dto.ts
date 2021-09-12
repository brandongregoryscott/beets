interface CreateUserDto {
    email: string;
    password: string;
    redirectTo?: string;
}

export type { CreateUserDto };
