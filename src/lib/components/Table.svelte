<script lang="ts">
	import type { Exam } from '$lib/interface';
	import type { ModalComponent, ModalSettings } from '@skeletonlabs/skeleton';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import AddEditExam from './AddEditExam.svelte';
	import { exams } from '$lib/stores';

	const modalStore = getModalStore();

	const deleteExam = (name: string) => {
		$exams = $exams.filter((exam) => exam.name !== name);
	};

	const onDeleteExamClicked = (exam: Exam) => {
		const modal: ModalSettings = {
			type: 'confirm',
			// Data
			title: 'Conferma elimina esame',
			body: `Vuoi davvero eliminare l'esame di <b>${exam.name}?</b>`,
			buttonTextCancel: 'Annulla',
			buttonTextConfirm: 'Elimina',
			// TRUE if confirm pressed, FALSE if cancel pressed
			response: (r: boolean) => {
				if (r) {
					deleteExam(exam.name);
				}
			}
		};
		modalStore.trigger(modal);
	};

	const onAddExamClicked = () => {
		const modalComponent: ModalComponent = {
			ref: AddEditExam
		};
		const modal: ModalSettings = {
			type: 'component',
			component: modalComponent
		};
		modalStore.trigger(modal);
	};
	const onEditExamClicked = (exam: Exam, index: number) => {
		const modalComponent: ModalComponent = {
			ref: AddEditExam,
			props: { exam, index },
			slot: '<p>Skeleton</p>'
		};
		const modal: ModalSettings = {
			type: 'component',
			component: modalComponent
		};
		modalStore.trigger(modal);
	};
</script>

<div class="lg:w-[50vh] space-y-2">
	<div class="w-full">
		<div class="border rounded-2xl border-gray-400">
			<div class="flex justify-center px-5 py-3 bg-surface-300 rounded-t-2xl">
				<div class="text-center text-wrap max-w-64 lg:max-w-full basis-1/3 my-auto">
					<p class="font-bold text-center basis-1/3">Esame</p>
				</div>
				<div class="text-center text-wrap basis-1/6 my-auto">
					<p class="font-bold">CFU</p>
				</div>
				<div class="text-center text-wrap basis-1/6 my-auto">
					<p class="font-bold">Voto</p>
				</div>
				<div class="text-center text-wrap basis-1/5 my-auto">
					<div class="flex">
						<div class="w-6"></div>
						<div class="w-6"></div>
					</div>
				</div>
			</div>

			<div>
				{#each $exams as exam, index}
					<div
						class={'flex flex-row justify-center px-5 py-3 border border-y-gray-400 ' +
							(index === 0 ? 'rounded-t-lg' : '') +
							(index === $exams.length - 1 ? 'rounded-b-lg ' : '') +
							(index % 2 === 0 ? ' bg-surface-100' : ' bg-surface-50')}
					>
						<div class="text-center text-wrap max-w-64 lg:max-w-full basis-1/3 my-auto">
							<p class="">
								{exam.name}
							</p>
						</div>
						<div class="basis-1/6 my-auto text-center ps-2">
							<p class="text-wrap">{exam.cfu}</p>
						</div>
						<div class="basis-1/6 my-auto text-center"><p class="text-wrap">{exam.vote}</p></div>
						<div class="basis-1/5 flex">
							<div class="flex my-auto -space-x-3">
								<button class="btn btn-sm h-full" on:click={() => onEditExamClicked(exam, index)}
									><svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-6 h-6 hover:text-blue-500 text-blue-700"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
										/>
									</svg>
								</button>
								<button class="btn btn-sm" on:click={() => onDeleteExamClicked(exam)}
									><svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-6 h-6 hover:text-red-500 text-red-700"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
										/>
									</svg>
								</button>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
	<div class="w-full relative">
		<button on:click={onAddExamClicked} class="btn variant-ghost absolute right-0"
			>Aggiungi esame</button
		>
	</div>
</div>
