import { takeCoverage } from "v8";
import { TaskManager } from "./TaskManager";
import { Status } from "./models/Task";
import { profileEnd } from "console";
import { stat } from "fs";

const taskManager = new TaskManager();
const args = process.argv.slice(2); // slices just user inputed arguments, removing Node and script paths (indexes 0 & 1)
const command = args[0]

function toStatus(value: string): Status | undefined {
    switch (value.toUpperCase()) {
        case "PENDING":
            return Status.Pending;
        case "INPROGRESS":
        case "IN PROGRESS":
        case "IN-PROGRESS":
            return Status.InProgress;
        case "DONE":
            return Status.Done;
        default:
            return undefined;
    }
}

switch (command) {
    case "add":
        const description = args[1];
        if (!description) {
            console.error("Please provide a task description in quotation marks, e.g.:");
            console.log(`   todotool add "buy milk"`);
            process.exit(1);
        }
        const newTask = taskManager.addTask(description);
        console.log(`Task added successfully: [${newTask.id}] ${newTask.description}`);
        break;

    case "list":
        const target = args[1];
        var tasks;
        if (!target) {
            tasks = taskManager.listTasks();
        } else {
            const status = toStatus(target);
            if (!status) {
                console.error("Invalid status given. Please specify either 'Pending', 'In Progress' or 'Done'.");
                process.exit(1);
            }
            tasks = taskManager.listTasks(status);
        }
        if (tasks.length === 0) {
            console.log("No tasks found.");
        } else {
            console.log("Your tasks:");
            tasks.forEach((task) => {
                console.log(
                    `[${task.id}] [${task.status}] ${task.description} - ${new Date(task.createdAt).toLocaleString()}`     
                );
            });
        }
        break;

    case "change-status": {
        const taskId = parseInt(args[1], 10);
        const newStatus = args[2];

        if (isNaN(taskId)) {
            console.error("Invalid ID. Please enter a number ID.");
            process.exit(1);
        }

        switch (newStatus.toUpperCase()) {
            case "PENDING":
                if (taskManager.changeTaskStatus(taskId, Status.Pending)) {
                    console.log(`Task ${taskId} status changed to Pending.`);
                } else {
                    console.error("Failed to change task status. Ensure task ID is correct.");
                }
                break;

            case "IN PROGRESS": 
            case "IN-PROGRESS":
            case "INPROGRESS":
                if (taskManager.changeTaskStatus(taskId, Status.InProgress)) {
                    console.log(`Task ${taskId} status changed to In Progress.`);
                } else {
                    console.error("Failed to change task status. Ensure task ID is correct.");
                }
                break;

            case "DONE":
                if (taskManager.changeTaskStatus(taskId, Status.Done)) {
                    console.log(`Task ${taskId} status changed to Done.`);
                } else {
                    console.error("Failed to change task status. Ensure task ID is correct.");
                }
                break;
        }
        break;
    }

    case "delete": {
        const target = args[1];

        if (!target) {
            console.error("Please provide a task ID or 'all'.");
            process.exit(1);
        }

        if (target.toUpperCase() === "ALL") {
            taskManager.deleteAllTasks();
            console.log("All tasks permanently deleted.")
        } else {
            const taskId = parseInt(target, 10);

            if (isNaN(taskId)) {
                console.error("Invalid parameter. Please enter a number ID, or 'all'.");
                process.exit(1);
            }
    
            if (taskManager.deleteTask(taskId)) {
                console.log(`Task ${taskId} permanently deleted.`);
            } else {
                console.error("Failed to delete task. Ensure task ID is correct.");
            }
        }
        break;
    }
}