<template>
	
	<div class="fluid-container white lighten-5 p-2">

		<text-content></text-content>
		<date-content></date-content>

	</div>

</template>

<script>
import TextContent from './ContentEditorComponents/TextContent'
import DateContent from './ContentEditorComponents/DateContent'

export default {
	components: {
		TextContent,
		DateContent
	}
}
</script>