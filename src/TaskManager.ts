import { Status, Task } from "./models/Task";
import * as fs from 'fs';
import * as path from 'path';

export class TaskManager {
    private tasks: Task[] = [];
    private dataPath: string = path.join(__dirname, '../data/tasks.json');

    constructor() {
        this.loadTasks();
    }

    private loadTasks(): void {
        if (fs.existsSync(this.dataPath)) {
            const fileContent = fs.readFileSync(this.dataPath, 'utf-8');
            try {
                this.tasks = JSON.parse(fileContent);
            } catch (error) {
                console.error("Failed to parse tasks.json. Defaulting to empty task array.");
                this.tasks = [];
            } 
        } else {
            this.tasks = [];
        }
    }

    private saveTasks(): void {
        const json = JSON.stringify(this.tasks, null, 2);
        fs.writeFileSync(this.dataPath, json, 'utf-8');
    }

    addTask(description: string): Task {
        const newTask: Task = {
            id: this.tasks.length + 1,
            description,
            status: Status.Pending,
            createdAt: new Date().toISOString()
        };

        this.tasks.push(newTask);
        this.saveTasks();
        return newTask;
    }

    listTasks(): Task[] {
        return this.tasks; 
    }

    changeTaskStatus(id: number, status: Status): boolean {
        const task = this.tasks.find(t => t.id === id);
        if (!task) {
            console.error(`No task was found with ID: ${id}`);
            return false;
        }
        task.status = status;
        this.saveTasks();
        return true;
    }

    deleteTask(id: number): boolean {
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter(t => t.id !== id);
        if (this.tasks.length < initialLength) {
            this.saveTasks();
            return true;
        }
        return false;
    }
}