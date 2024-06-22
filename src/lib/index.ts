import type { Grade } from './interface';

export const getStartingPoint = (wAvg: number) => {
	return Number(((wAvg * 11) / 3).toFixed(2));
};

export const getWeightedAverage = (exams: Grade[]) => {
	const totalCfu = exams.reduce((acc, exam) => acc + exam.Exam.cfu, 0);
	const totalWeightedScore = exams.reduce((acc, exam) => acc + exam.Exam.cfu * exam.grade, 0);
	return Number((totalWeightedScore / totalCfu).toFixed(2));
};

export const averageNeededForBase = (exams: Grade[], base: number, maxObtainableCFU: number) => {
	const obtainedCfu = exams.reduce((acc, exam) => acc + exam.Exam.cfu, 0);
	const missingCfu = maxObtainableCFU - obtainedCfu;
	const obtainedSum = exams.reduce((acc, exam) => acc + exam.Exam.cfu * exam.grade, 0);
	const averageNeeded = Number(
		((((base * 3) / 11) * maxObtainableCFU - obtainedSum) / missingCfu).toFixed(2)
	);
	return averageNeeded;
};
