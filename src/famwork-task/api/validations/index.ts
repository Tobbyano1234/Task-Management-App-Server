import { Joi } from "celebrate";
import { toObjectId } from "../../../famwork-shared/validateToObjectID";


export default {
    createTask: {
        body: Joi.object({
            userID: Joi.string().required(),
            title: Joi.string().required(),
            description: Joi.string().required(),
            dueDate: Joi.date().required(),
        })
    },
    getTask: {
        params: {
            taskID: Joi.string().custom(toObjectId).required(),
        }
    },
    getAllTasks: {
        params: {
            userID: Joi.string().custom(toObjectId).required(),
        }
    },
    updateTask: {
        body: Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
            dueDate: Joi.date().required(),
        }),
        params: {
            taskID: Joi.string().custom(toObjectId).required(),
        }
    },

    deleteTask: {
        params: {
            taskID: Joi.string().custom(toObjectId).required(),
        }
    },
    getPagination: {
        query: {
            page: Joi.number(),
            limit: Joi.number(),
        }
    },
};