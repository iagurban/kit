import {uidGenerator} from "@gurban/kit/core/uid-generator";

export const newTaskIdPrefix = `!!NEW:`;
export const generateNewTaskId = () => `${newTaskIdPrefix}${uidGenerator()}`;

