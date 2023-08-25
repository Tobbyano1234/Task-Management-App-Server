import { Admin } from "./Admin"
import { General } from "./General"
import { Product } from "./Product"
import { Task } from "./Task"
import { TempStore } from "./TempStore"
import { User } from "./User"


export enum ModelNames {
    PRODUCT = "product",
    USER = "user",
    ADMIN = "admin",
    TASK = "task",
    GENERAL = "general",
    TEMP_STORE = "tempstore"
}

export type ModelTypeMap = {
    [ModelNames.PRODUCT]: Product,
    [ModelNames.USER]: User,
    [ModelNames.ADMIN]: Admin,
    [ModelNames.TASK]: Task,
    [ModelNames.GENERAL]: General,
    [ModelNames.TEMP_STORE]: TempStore,
}