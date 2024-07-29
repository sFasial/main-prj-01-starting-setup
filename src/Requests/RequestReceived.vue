<template>
    <h3>Coaches Request</h3>

    <base-dialog :show="!!isError" title="An Error Occured" @close="HandleError">
        <p>{{ isError }}</p>
    </base-dialog>

    <!-- <h1>getRequest : {{ getRequest }}</h1> -->
    <section>
        <base-card>
            <header>
                <h2>Request Received</h2>
            </header>

            <base-spinner v-if="isLoading"></base-spinner>
            <ul v-else-if="hasRequests && !isLoading">
                <request-item v-for="request in getRequest" :key="request.id" :request="request">
                </request-item>
            </ul>
            <h3 v-else>You have not received any request</h3>
        </base-card>
    </section>
    <section>
        <button @click="FetchAllRequest"> LoadCoaches </button>
    </section>
</template>

<script>
import RequestItem from './RequestItem.vue';
import { mapActions, mapGetters } from 'vuex'
export default {
    components: {
        RequestItem
    },
    mounted(){
        this.FetchAllRequest();
    },
    computed: {
        ...mapGetters(['getRequest', 'hasRequests']),
    },
    data() {
        return {
            isLoading: false,
            isError: ''
        }
    },
    methods: {
        ...mapActions['FetchCoachRequest'],
        async FetchAllRequest() {
            this.isLoading = true;
            try {
                await this.$store.dispatch('FetchCoachRequest');
                this.isLoading = false;
            } catch (error) {
                this.isError = error.message || "Something went wrong while fetching Coaches Request";
            }
            finally {
                this.isLoading = false;
            }
        },
        HandleError() {
            this.isError = null;
        }
    }
}
</script>

<style scoped>
header {
    text-align: center;
}

ul {
    list-style: none;
    margin: 2rem auto;
    padding: 0;
    max-width: 30rem;
}

h3 {
    text-align: center;
}
</style>