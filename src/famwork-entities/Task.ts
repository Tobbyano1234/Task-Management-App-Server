import { ObjectId } from "mongodb";
import { Document, Schema, model } from "mongoose";
import { ModelNames } from ".";
import { TaskStatus } from "../typings/Account.types";

export class Task extends Document {
    userId: ObjectId;
    title: string;
    description: string;
    dueDate: Date;
    status: TaskStatus;
    notifications: [{
        date: Date;
        time: string;
        message: string;
    }];
};

const TaskSchema = new Schema({
    userId: { type: ObjectId, ref: ModelNames.USER, required: true },
    title: { type: String, required: true },
    description: { type: String, require: true },
    dueDate: { type: Date, required: true },
    status: {type:String, enum:[TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED], required:true},
    notifications: [
        {
            date: { type: Date, required: true },
            time: { type: String, required: true },
            message: { type: String, required: true },
        },
    ],
}, { timestamps: true });

export const TaskModel = model<Task>(ModelNames.TASK, TaskSchema);