<template>
    <section class="home">
        <div class="home__logo">
            <img alt="Vue logo" src="../assets/logo.png">
        </div>
        <div class="home__table">
            <div class="container">
                <div class="row">
                    <div class="col-md-3" v-loading="loading" v-for="post in displayedPosts">
                        <div class="card mb-4 box-shadow post-cards">
                            <div class="card-body">
                                <h5 class="capitalize">{{post.title}}</h5>
                                <p class="card-text">{{post.subTitle}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <p class="card-text">Current page: <span class='font-weight-bold'>{{this.page}}</span></p>
                <p class="card-text">Posts on current page: <span class='font-weight-bold'>{{displayedPosts.length}}</span></p>
                <div class="clearfix btn-group d-flex flex-wrap justify-content-center">
                    <el-button type="primary" v-if="page != 1" @click="page--" icon="el-icon-d-arrow-left"
                               circle></el-button>
                    <el-button type="primary" v-for="pageNumber in pages" @click="page = pageNumber"
                               circle>{{pageNumber}}</el-button>
                    <el-button type="primary" @click="page++" v-if="page < pages.length" icon="el-icon-d-arrow-right" circle></el-button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    // @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue'

    export default {
        name: 'home',
        components: {
            // HelloWorld
        },
        data() {
            return {
                posts: [],
                loading: true,
                total: 0,
                page: 1,
                perPage: 8,
                pages: [],
            }
        },
        mounted() {
            this.loadData();
        },
        methods: {
            loadData: function () {
                let data = [];
                this.$http.get().then((response) => {
                    data = response.data;
                    console.log(data);
                    this.posts = data;
                    this.loading = false;
                }).catch((error) => {
                    console.log(error);
                })
            },
            setPages: function () {
                let numberOfPages = Math.ceil(this.posts.length / this.perPage);
                for (let index = 1; index <= numberOfPages; index++) {
                    this.pages.push(index);
                }
            },
            paginate (posts) {
                let page = this.page;
                let perPage = this.perPage;
                let from = (page * perPage) - perPage;
                let to = (page * perPage);
                return posts.slice(from, to);
            },
        },
        watch: {
            posts () {
                this.setPages();
            }
        },
        computed: {
            displayedPosts () {
                return this.paginate(this.posts);
            }
        },
    }
</script>
