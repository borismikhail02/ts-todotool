import { TaskManager } from "../src/TaskManager";
import { Status, Task } from "../src/models/Task";
import { describe, it, expect } from "vitest";

describe("TaskManager", () => {
    it("should add a task", () => {
        const tm = new TaskManager();
        tm.deleteAllTasks();
        const task = tm.addTask("Test task description");

        expect(task.description).toBe("Test task description");
        expect(task.status).toBe(Status.Pending);
    });

    it("should list all tasks", () => {
        const tm = new TaskManager();
        tm.deleteAllTasks();
        tm.addTask("Test task description");
        tm.addTask("Second test task");
        const tasks = tm.listTasks();

        expect(tasks.length === 2);
    });

    it("should list tasks of done status", () => {
        const tm = new TaskManager();
        tm.deleteAllTasks();
        tm.addTask("Test task description");
        tm.addTask("Second test task");
        tm.changeTaskStatus(2, Status.Done);
        const doneTasks = tm.listTasks(Status.Done);

        expect(doneTasks.length === 1);
    });

    it("should list tasks of pending status", () => {
        const tm = new TaskManager();
        tm.deleteAllTasks();
        tm.addTask("Test task description");
        tm.addTask("Second test task");
        tm.changeTaskStatus(2, Status.Done);
        const pendingTasks = tm.listTasks(Status.Pending);

        expect(pendingTasks.length === 1);
    });

    it("should list tasks of in progress status", () => {
        const tm = new TaskManager();
        tm.deleteAllTasks();
        tm.addTask("Test task description");
        tm.addTask("Second test task");
        tm.changeTaskStatus(2, Status.InProgress);
        const inProgressTasks = tm.listTasks(Status.InProgress);

        expect(inProgressTasks.length === 1);
    });

    it("should modify task status to InProgress", () => {
        const tm = new TaskManager();
        tm.deleteAllTasks();
        const task = tm.addTask("Test task description");
        const success = tm.changeTaskStatus(1, Status.InProgress);
        const updatedTask = tm.listTasks().find(t => t.id === task.id);
        
        expect(success).toBe(true);
        expect(updatedTask?.status).toBe(Status.InProgress);
    });

    it("should modify task status to Done", () => {
        const tm = new TaskManager();
        tm.deleteAllTasks();
        const task = tm.addTask("Test task description");
        const success = tm.changeTaskStatus(1, Status.Done);
        const updatedTask = tm.listTasks().find(t => t.id === task.id);
        
        expect(success).toBe(true);
        expect(updatedTask?.status).toBe(Status.Done);
    });

    it("should modify task status to Pending", () => {
        const tm = new TaskManager();
        tm.deleteAllTasks();
        const task = tm.addTask("Test task description");
        tm.changeTaskStatus(1, Status.Done);
        const success = tm.changeTaskStatus(1, Status.Pending);
        const updatedTask = tm.listTasks().find(t => t.id === task.id);
        
        expect(success);
        expect(updatedTask?.status).toBe(Status.Pending);
    });
    
    it("should delete a task", () => {
        const tm = new TaskManager();
        tm.deleteAllTasks();
        const task = tm.addTask("Test task description");
        const success = tm.deleteTask(task.id);
        const tasks = tm.listTasks();

        expect(success);
        expect(tasks.length === 0);
    });

    it("should delete all tasks", () => {
        const tm = new TaskManager();
        tm.deleteAllTasks();
        tm.addTask("Test task description");
        tm.addTask("Second test task");
        tm.deleteAllTasks();
        const tasks = tm.listTasks();

        expect(tasks.length === 0);
    });
});