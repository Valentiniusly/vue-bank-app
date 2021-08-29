<template>
  <app-page back  title="Help">
		<question-item
			v-for="q in questions"
			:key="q.title"
			:question="q"
		></question-item>
	</app-page>
</template>

<script>
import AppPage from '../components/ui/AppPage';
import QuestionItem from '../components/question/QuestionItem';

export default {
	components: {AppPage, QuestionItem},
	setup() {
		const questions = [
			{title: 'What is in this system?', text: 'Everything is here'},
			{title: 'How authorization works?', text: 'Authorization works very well'}
		];

		return {
			questions
		}
	},
}
</script>