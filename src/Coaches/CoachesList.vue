<template>

<base-dialog :show="!!isError" title="An Error Occured" @close="HandleError">
    <p>{{ isError }}</p>
</base-dialog>
    <section>
        <coach-filter @change-filter="SetFilters"></coach-filter>
    </section>

    <section>
        <base-card>
            <div class="controls">
                <base-button mode="outline" @click="this.LoadCoachesAction">
                    Refresh
                </base-button>
                <base-button to="/register" link>Register As A Coach</base-button>
            </div>

            <div v-if="isLoading">
                <base-spinner></base-spinner>
            </div>

            <!-- <ul v-for="coach in coaches" :key="coach.id"> -->
            <ul v-else-if="hasCoaches && !isLoading">
                <!-- <li  v-for="coach in filteredCoaches" :key="coach.id">{{ coach }}</li> -->
                <coach-item v-for="coach in filteredCoaches" :key="coach.id" :coach=coach>
                </coach-item>
            </ul>
            <h3 v-else>No Coaches found</h3>
        </base-card>
    </section>

    <h1>
        <button @click="FetchCoachRequest">FetchCoachRequest</button>
    </h1>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CoachItem from './CoachItem.vue';
import CoachFilter from './CoachFilter.vue';

export default {
    components: {
        CoachItem,
        CoachFilter
    },
    mounted(){
        this.LoadCoachesAction();
    },
    data() {
        return {
            isLoading : false,
            isError : false,
            activefilters: {
                frontend : true,
                backend : true,
                career : true,
            }
        }
    },
    computed: {
        ...mapGetters(['coaches', 'hasCoaches']),
        filteredCoaches() {
            // return this.$store.getters.coaches;
            const coaches =  this.$store.getters.coaches;
            return coaches.filter(coach => {
                if (this.activefilters.frontend && coach?.areas?.includes('frontend')) {
                    return true;
                }
                if (this.activefilters.backend && coach?.areas?.includes('backend')) {
                    return true;
                }
                if (this.activefilters.career && coach?.areas?.includes('career')) {
                    return true;
                }
                return false;
            })
        }
    },
    methods : {
        ...mapActions(['LoadCoaches', 'FetchCoachRequest']),
        SetFilters(eventDataUpdatedFilter){
            this.activefilters = eventDataUpdatedFilter;
        },
        async LoadCoachesAction() {
            this.isLoading = true;
            try {
                 await this.LoadCoaches();
                
            } catch (error) {
                this.isError = error.message || 'Something went wrong';
            } finally {
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
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.controls {
    display: flex;
    justify-content: space-between;
}
</style>