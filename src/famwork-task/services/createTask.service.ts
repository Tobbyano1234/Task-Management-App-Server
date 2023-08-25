import { TaskModel } from "../../famwork-entities";
import { CreateTaskDTO } from "../DTOs/CreateTaskDTO";

export const createTaskService = async ({ userID, title, description, dueDate }: CreateTaskDTO) => {
    const taskExist = await TaskModel.findOne({ userID, title });
    if (taskExist) return { success: false, message: `task with ${title} already exist`, data: null };

    const task = await TaskModel.create({ userID, title, description, dueDate });
    return { success: true, message: `task created successfully`, data: task };
};