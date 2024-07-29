<template>
    <li>
        <h3>{{fullName}}</h3>
        <!-- <h3>{{coach.firstName}}</h3> -->
        <h4>{{coach.hourlyRate}}/hour</h4>

        <div>
            <!-- <span v-for="area in coach.areas" :key="area">{{area}}</span> -->
            <base-badge v-for="area in coach.areas" :key="area" :type="area" :title="area"></base-badge>

        </div>
        
        <div class="actions">
            <!-- <router-link to="/coaches/c1/contact">Contact</router-link> -->
            <base-button link mode="outline" :to=CoachContactLink>Contact</base-button>
            <!-- <router-link to="/coaches/" + this.coach?.id>View Details</router-link> -->
            <base-button link :to=CoachDetailLink>Detail</base-button>
        </div>
    </li>
    
</template>

<script>
export default {
    props:{
        coach : {
            required : false , 
            type : Object
        }
    },
    data(){
        return {
            
        }
    },
    computed : {
        fullName(){
            return this.coach?.firstName + ' ' + this.coach?.lastName
        },
        CoachContactLink(){
            return '/coaches/' + this.coach?.id + '/contact';
        },
        CoachDetailLink(){
            return '/coaches/' + this.coach?.id;
        }
    }
}
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>