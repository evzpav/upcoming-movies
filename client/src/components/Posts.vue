<template> 
<div>
    <h1>Posts</h1>
    <div v-for="post in posts" :key="post.id">
        {{post}}
    </div>
</div>

</template>

<script>
import { getPosts } from "../api"

export default {
    created(){
        this.getPosts();
    },
    data:()=>({
        posts: []
    }),
    methods:{
        async getPosts(){
            try {
                const resp = await getPosts();
                this.posts = resp.data.result;   
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>


