import { writable } from 'svelte/store';
import type { Exam } from './interface';

export const weightedAverage = writable(28.5);
export const exams = writable<Exam[]>([]);
