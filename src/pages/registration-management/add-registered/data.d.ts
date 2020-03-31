

interface doctorsType {
    id: number;
    name: string;
    gender: number;
    age: number;
    mobile: number;
    affiliatedClinic: number;
    department: number;
    role: number;
    createTime: string;
    createPeople: string;
    employeeStatus: number;
}


export interface StateType {
    doctors: doctorsType[];
}


// 
export interface RegisteredInfoProps {
    doctors: doctorsType[];
    loading: boolean;
}
