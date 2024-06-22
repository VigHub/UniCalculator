
import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_KEY } from '$env/static/public'
import type { Exam, Grade } from './interface'
const supabaseUrl = 'https://njyrffhbkkrlpktjpgoq.supabase.co'
const supabaseKey = PUBLIC_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


export const getExams = async (can_grade?: boolean) => {
    if (can_grade !== undefined) {
        let { data: exams } = await supabase
            .from('Exam')
            .select('*')
            .eq('can_grade', can_grade)
            .returns<Exam[]>()
        if (!exams) exams = []
        return exams
    }
    let { data: exams } = await supabase
        .from('Exam')
        .select('*')
        .returns<Exam[]>()
    if (!exams) exams = []
    return exams
}

export const getGradedExams = async () => {
    let { data: exams } = await supabase
        .from('Grade')
        .select('grade, id, Exam (title, cfu, can_grade, id)')
        .order('date')
        .returns<Grade[]>()
    if (!exams) exams = []
    return { exams }
}

export const updateGradedExam = async (grade: number, gradeID?: number) => {
    let { error } = await supabase
        .from('Grade')
        .update({ grade })
        .eq('id', gradeID)
    return error === null
}

export const updateExam = async (exam: Exam, examID?: number) => {
    let { error } = await supabase
        .from('Exam')
        .update(exam)
        .eq('id', examID)
    return error === null
}

export const insertGrade = async (grade: number, exam: Exam) => {
    const { error } = await supabase
        .from('Grade')
        .insert({ grade, exam_id: exam.id })
    return error === null
}

export const insertExam = async (exam: Exam) => {
    const { data } = await supabase
        .from('Exam')
        .insert(exam)
        .select()
        .single<Exam>()
    return data
}

export const removeExam = async (examID?: number) => {
    const { error } = await supabase
        .from('Exam')
        .delete()
        .eq('id', examID)
    return error === null
}

export const removeGrade = async (gradeID?: number) => {
    const { error } = await supabase
        .from('Grade')
        .delete()
        .eq('id', gradeID)
    return error === null
}