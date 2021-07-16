import { createRouter, createWebHistory } from 'vue-router';
import Main from '@/pages/Main.vue'
import About from '@/pages/About.vue';
import Posts from '@/pages/Posts.vue'
import PostsStore from '@/pages/PostsStore.vue';
import PostsCompositionApi from '@/pages/PostsCompositionApi.vue';
import Post from '@/pages/Post.vue';

const router = createRouter({
  routes: [
    { path: '/', component: Main },
    { path: '/about', component: About },
    { path: '/posts', component: Posts },
    { path: '/posts-store', component: PostsStore },
    { path: '/posts-comp-api', component: PostsCompositionApi },
    { path: '/posts/:id', component: Post },
  ],
  history: createWebHistory(),
});

export default router