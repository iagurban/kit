import {uidGenerator} from "@freyja/kit/src/core/uid-generator";

export const newTaskIdPrefix = `!!NEW:`;
export const generateNewTaskId = () => `${newTaskIdPrefix}${uidGenerator()}`;

