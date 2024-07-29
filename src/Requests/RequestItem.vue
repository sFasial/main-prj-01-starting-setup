<template>
            <li>
                <div>
                    <a :href="emailLink">{{ userEmail}}</a>
                </div>
                <p>{{userMessage}}</p>
            </li>
</template>

<script>
// import { mapGetters } from 'vuex'
export default {
  mounted(){
    // console.log('******request******', this.request);
  },
    props:{
        request : {
            type : Object,
            required : true
        }
    },
    computed:{
        emailLink(){
            return 'mailto:' + this.userEmail;
        },
        userEmail(){
          return this.request?.userEmail
        },
        userMessage(){
          return this.request?.message
        }
    },
    data(){
        return{
        }
    },
    methods:{
    }
}
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #ccc;
  padding: 1rem;
}

a {
  color: #3d008d;
  text-decoration: none;
  font-weight: bold;
}

a:hover,
a:active {
  color: #8d007a;
}

p {
  margin: 0.5rem 0 0 0;
}
</style>