import { writable } from 'svelte/store';
import type { Grade } from './interface';

export const examsStore = writable<Grade[]>([]);
