<script lang="ts">
	import { averageNeededForBase, getStartingPoint, getWeightedAverage } from '$lib';
	import Table from '$lib/components/Table.svelte';
	import { exams } from '$lib/stores';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	$exams = [
		{ name: 'Storia del libro', cfu: 9, vote: 27 },
		{ name: 'Letteratura e Sistemi Editoriali', cfu: 9, vote: 27 },
		{ name: 'Storia Sociale dello Spettacolo', cfu: 9, vote: 29 },
		{ name: 'Cultura Visuale', cfu: 6, vote: 28 },
		{ name: 'Estetica degli Oggetti', cfu: 9, vote: 30 },
		{ name: 'Comunicazione e Web', cfu: 6, vote: 28 }
	];

	const notConsideredCFU = [
		{ name: 'Tesi', cfu: 24 },
		{ name: 'Lab Tesi', cfu: 3 },
		{ name: 'Stage', cfu: 6 },
		{ name: 'Lab', cfu: 3 }
	];

	$: weightedAverage = getWeightedAverage($exams);
	const maxObtainableCFU = 120 - notConsideredCFU.reduce((acc, exam) => acc + exam.cfu, 0);
	let baseWanted: number;
</script>

<div class="container min-h-[60vh] h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<div class="flex space-x-10">
			<div class="mt-5 w-full">
				<h1 class="text-xl my-auto">Media attuale</h1>
				<h1 class="text-5xl my-auto">
					{weightedAverage}
				</h1>
			</div>
			<div class="mt-5">
				<h1 class="text-xl my-auto">Partenza tesi</h1>
				<h1 class="text-5xl my-auto">{getStartingPoint(weightedAverage)}</h1>
			</div>
		</div>
		<Table />
		<div class="flex w-full pt-5">
			<div class="flex lg:w-full lg:mx-auto w-fit space-x-6 justify-center">
				<h1 class="text-3xl my-auto w-32">CFU fatti su totale</h1>
				<div class="my-auto">
					<ProgressRadial
						value={$exams.reduce((acc, exam) => acc + exam.cfu, 0)}
						max={maxObtainableCFU}
						theme="primary"
						strokeLinecap="round"
						width="lg:w-32 w-24"
						animate
						>{$exams.reduce((acc, exam) => acc + exam.cfu, 0)} / {maxObtainableCFU}</ProgressRadial
					>
				</div>
				<div class="flex flex-col h-full my-auto">
					<p class="text-xl font-bold">CFU tolti:</p>
					{#each notConsideredCFU as exam}
						<div class="flex space-x-2 relative min-h-[20px]">
							<p class="absolute left-0">{exam.name}</p>
							<p class="absolute right-3">{exam.cfu}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
		<div class="space-y-3 pb-10">
			<div class="flex justify-center lg:w-full w-fit space-x-1">
				<p class="h3 my-auto w-[200px]">Per partire da</p>
				<input
					type="number"
					name="baseWanted"
					id="baseWanted"
					placeholder="Base desiderata"
					bind:value={baseWanted}
					class="input input-primary my-auto w-36"
					min="90"
					max="110"
				/>
			</div>
			<div class="flex lg:w-full w-fit space-x-5">
				<p class="h3 my-auto">devi prendere in media</p>
				<p class="h3 my-auto w-[100px]">
					{baseWanted >= 90 && baseWanted <= 110
						? averageNeededForBase($exams, baseWanted, maxObtainableCFU)
						: '--'}
				</p>
			</div>
		</div>
	</div>
</div>
