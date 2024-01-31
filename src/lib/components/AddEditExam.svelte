<script lang="ts">
	import type { Exam } from '$lib/interface';
	import { exams } from '$lib/stores';
	import { getModalStore } from '@skeletonlabs/skeleton';

	export let exam: Exam | undefined = undefined;
	export let index: number | undefined = undefined;
	let name: string;
	let cfu: number;
	let vote: number;
	if (exam && index) {
		name = exam.name;
		cfu = exam.cfu;
		vote = exam.vote;
	}

	const modalStore = getModalStore();

	const addExam = () => {
		$exams = [...$exams, { name, cfu, vote }];
		modalStore.close();
	};

	const editExam = () => {
		if (name !== '') {
			$exams = $exams.map((e, i) => {
				if (index === i) {
					return { name, cfu, vote };
				}
				return e;
			});
		}
		modalStore.close();
	};

	const onClick = () => {
		if (exam && index) {
			editExam();
		} else {
			addExam();
		}
	};

	const buttonMessage = exam && index ? 'Modifica' : 'Aggiungi';
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
					bind:value={name}
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
						bind:value={cfu}
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
						bind:value={vote}
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
