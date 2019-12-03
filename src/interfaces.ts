
export interface PowerUsers {
    id: number;
    name: string;
    count:number;
}

   

export interface Action {
    type:string;
    dataUsers: PowerUsers[];
    dataId: number
}

export interface SearchChangeInterface {
    handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface UserListInterface {
    powerUsers: PowerUsers[];
    handleUserUpdate: (id: number) => void;
    handleUserRemove: (id: number) => void;
}

export interface UserInterface {
    user: PowerUsers;
    handleUserUpdate: (id: number) => void;
    handleUserRemove: (id: number) => void;
}

export interface UserTestInterface {
    user: PowerUsers;
    handleUserUpdate: (id: number) => void;
    handleUserRemove: (id: number) => void;
    handleUpdate: () => void;
}