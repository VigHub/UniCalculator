import type { PageLoad } from "./$types";
import { getExams, getGradedExams } from '$lib/db';
import { getWeightedAverage } from "$lib";
import { examsStore } from "$lib/stores";

export const load: PageLoad = async () => {
    const loadExams = async () => {
        const exams = await getGradedExams();
        const examsCantGrade = await getExams(false);
        const weightedAverage = getWeightedAverage(exams.exams)
        const maxObtainableCFU = 120 - examsCantGrade.reduce((acc, exam) => acc + exam.cfu, 0);
        examsStore.set(exams.exams)
        return { exams, weightedAverage, examsCantGrade, maxObtainableCFU }
    }
    return { lazy: loadExams() }
};