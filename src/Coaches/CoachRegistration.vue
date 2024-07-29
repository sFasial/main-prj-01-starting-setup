<template>
    <h3>Coaches Registration Form</h3>

    <form @submit.prevent="submitForm">
        <div class="form-control">
            <label for="firstname">Firstname</label>
            <input type="text" id="firstname" v-model="firstName">
        </div>
        
        <div class="form-control">
            <label for="lastName">LastName</label>
            <input type="text" id="lastName" v-model="lastName">
        </div>

        <div class="form-control">
            <label for="description">description</label>
            <textarea type="text" id="description" v-model="description"/>
        </div>

        <div class="form-control">
            <label for="hourlyRate">hourlyRate</label>
            <input type="text" id="hourlyRate" v-model="hourlyRate">
        </div>
        
        <div class="form-control">
      <h2>What are your areas of expertise in?</h2>
      <div>
        <input id="frontend" name="areasOfExpertise" value="frontend" type="checkbox" v-model="areasOfExpertise" />
        <label for="frontend">Frontend</label>
      </div>
      <div>
        <input id="backend" name="areasOfExpertise" value="backend" type="checkbox" v-model="areasOfExpertise" />
        <label for="backend">Backend</label>
      </div>
      <div>
        <input id="career" name="areasOfExpertise" value="career" type="checkbox" v-model="areasOfExpertise" />
        <label for="career">Career</label>
      </div>
    </div>

    <base-button>Register</base-button>

    </form>
</template>

<script>
export default {
    data(){
        return{
            firstName : '',
            lastName : '',
            description : '',
            hourlyRate : '',
            areasOfExpertise : [],
        }
    },
    methods:{
        ValidateForm(){
            if (this.firstName == '') {
                return 'firstName is empty'
            }
            if (this.lastName == '') {
                return 'lastName is empty'
            }
            if (this.description == '') {
                return 'description is empty'
            }
            if (this.hourlyRate == '') {
                return 'hourlyRate is empty'
            } 
            if (this.areasOfExpertise.length <=0) {
                return 'areasOfExpertise is empty'
            }
            return ''
        },
        submitForm(){
            const validation = this.ValidateForm();
            if (validation !='' ) {
                alert(validation);
                return;
            }
            const data = {
                firstName : this.firstName,
                lastName : this.lastName,
                description : this.description,
                hourlyRate : this.hourlyRate,
                areasOfExpertise : this.areasOfExpertise,
            }
            // console.log('data', data);
            // this.$store.commit('RegisterNewCoach',data);
            this.$store.dispatch('RegisterNewCoach',data);
            this.$router.push('coaches');
        }
    }
}
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>