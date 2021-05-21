<template>
    <v-btn 
        color="rgb(220, 20, 60)"
        class="font-weight-bold"
        @click="count++"
        dark 
    >
        You Pressed Me {{ count }} Times! 
    </v-btn>
</template>

<script>

export default({
    name: 'ButtonCounter',
    data() {
        return {
            count: 0,
        }
    },
});
</script>