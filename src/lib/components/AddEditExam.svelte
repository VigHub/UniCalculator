<script lang="ts">
	import { insertExam, insertGrade, removeExam, updateExam, updateGradedExam } from '$lib/db';
	import type { Grade } from '$lib/interface';
	import { examsStore } from '$lib/stores';
	import { getModalStore } from '@skeletonlabs/skeleton';

	export let exam: Grade;
	let modifyExam = true;
	if (exam === undefined) {
		modifyExam = false;
		exam = {
			Exam: {
				title: '',
				cfu: 3
			},
			grade: 0
		};
	}

	const modalStore = getModalStore();

	const addExam = async () => {
		const examAdded = await insertExam(exam.Exam);
		if (examAdded === null) return;
		exam.Exam.id = examAdded.id;
		const gradeAdded = await insertGrade(exam.grade, exam.Exam);
		if (gradeAdded) {
			$examsStore = [...$examsStore, exam];
			modalStore.close();
		} else {
			await removeExam(exam.Exam.id);
		}
	};

	const editExam = async () => {
		const gradeUpdated = await updateGradedExam(exam.grade, exam.id);
		const examUpdated = await updateExam(exam.Exam, exam.Exam.id);
		if (gradeUpdated && examUpdated) {
			$examsStore = $examsStore.map((examIter) => {
				if (examIter.id === exam.id) {
					return exam;
				}
				return examIter;
			});
			modalStore.close();
		}
	};

	const onClick = async () => {
		if (modifyExam) {
			await editExam();
		} else {
			await addExam();
		}
	};

	const buttonMessage = modifyExam ? 'Modifica' : 'Aggiungi';
</script>

<div class="card p-4 w-modal shadow-xl" spellcheck="false">
	<form>
		<div class="flex flex-col space-y-2">
			<div class="flex flex-col space-y-2">
				<label for="name">Nome esame</label>
				<input
					type="text"
					name="name"
					id="name"
					placeholder="Nome esame"
					bind:value={exam.Exam.title}
					class="input input-primary"
				/>
			</div>
			<div class="flex space-x-10">
				<div class="flex flex-col space-y-1">
					<label for="cfu">CFU</label>
					<input
						type="number"
						name="cfu"
						id="cfu"
						placeholder="CFU"
						bind:value={exam.Exam.cfu}
						class="input input-primary"
						min="3"
						max="12"
					/>
				</div>
				<div class="flex flex-col space-y-1">
					<label for="vote">Voto</label>
					<input
						type="number"
						name="vote"
						id="vote"
						placeholder="Voto"
						bind:value={exam.grade}
						class="input input-primary"
						min="18"
						max="30"
					/>
				</div>
			</div>
			<div class="flex justify-end">
				<button on:click={onClick} class="btn variant-ghost">{buttonMessage}</button>
			</div>
		</div>
	</form>
</div>
