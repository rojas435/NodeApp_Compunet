export interface UserInput{
    name: string,
    email: string,
    password: string // EL ? significa que es opcional
}

export interface UserInputUpdate{
    name: string,
    email: string,
}

export interface userLogin{
    email: string,
    password: string
}

export interface UserLoginResponse{
    user: {
        id: string,
        name: string,
        email: string,
        role: string[],
        token: string
    }
}

