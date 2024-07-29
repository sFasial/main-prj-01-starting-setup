<!-- OLD -->
<!-- <template>
    <h3>Coaches Details</h3>

    <router-view></router-view>
    <router-link to="/coaches/c1/contact">Contact</router-link>
</template>

<script>


</script> -->

<!-- NEW  -->

<template>

    <h1>ContactLink : {{ContactLink}}</h1>
    <section>
        <base-card>
            <h2>{{ fullName }}</h2>
            <h2>{{ hourlyRate }}/hour</h2>

        </base-card>
    </section>

    <section>
        <base-card>
            <header>
                <h2>
                    Intrested ? Reach Out Now
                </h2>
                <base-button :to="ContactLink">Contact</base-button>
            </header>
            <router-view></router-view>
        </base-card>
    </section>

    <section>
        <base-card>
            <base-badge v-for="area in areas" :key="area" :title="area" :type="area"></base-badge>
            <p>{{ description }}</p>
        </base-card>
    </section>

</template>

<script>

export default {
    props: {
        id: {
            required: false,
            type: String
        }
    },
    mounted() {
        console.log('this.$store.getters.coaches', this.$store.getters.coaches);
        this.selectedCoach = this.$store.getters.coaches.find(coach => coach.id == this.id)
        console.log('this.selectedCoach', this.selectedCoach);

        // const id = this.$route.params.id;
        // console.log('id', id);
    },
    computed: {
        fullName() {
            return this.selectedCoach?.firstName + ' ' + this.selectedCoach?.lastName
        },
        hourlyRate() {
            return this.selectedCoach?.hourlyRate
        },
        areas() {
            return this.selectedCoach?.areas
        },
        description() {
            return this.selectedCoach?.description
        },
        ContactLink() {
            console.log('this.$route', this.$route);
            // return this.$route.path + '/' + this.id + '/contact';
            return this.$route.path  + '/contact';
        },
    },
    data() {
        return {
            selectedCoach: null
        }
    }
}

</script>

<style scoped>

</style>