<template>
    <v-list-item>
        <v-list-content>
            <p>
                The Post Author Is: {{ post.author }}
            </p>
            <p>
                The Post Title Is: {{ post.title }}
            </p>
            <p>
                Post: {{ post.date }}
            </p>
            <h1>
                Content 
            </h1>
            <p class="font-weight-bold">
                {{ post.content }}
            </p>
        </v-list-content>
    </v-list-item>
</template>

<script>

export default({
    name: 'BlogPost',
    props: ['post'],
});
</script>
            