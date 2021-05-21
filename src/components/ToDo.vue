<template>
    <v-list-item> 
        {{ todo. text }}
    </v-list-item>
</template>

<script> 

export default({
    name: 'ToDo',
    props: ['todo'],
});
</script>