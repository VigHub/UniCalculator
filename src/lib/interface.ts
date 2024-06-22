export interface Exam {
	title: string;
	cfu: number;
	id?: number
}

export interface Grade {
	grade: number;
	date?: string;
	Exam: Exam;
	id?: number;
}
