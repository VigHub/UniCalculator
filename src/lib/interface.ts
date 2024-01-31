export interface Exam {
	name: string;
	cfu: number;
	vote: number;
	professor?: Professor;
	doneAt?: Date;
}

export interface Professor {
	name: string;
	surname: string;
}
