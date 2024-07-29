import { createStore } from 'vuex';

const store = createStore({
  state() {

    return {
      coaches: [
      ],
      // coaches: [
      //   {
      //     id: 'c1',
      //     firstName: 'Maximilian',
      //     lastName: 'Schwarzmüller',
      //     areas: ['frontend', 'backend', 'career'],
      //     description:
      //       "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
      //     hourlyRate: 30
      //   },
      //   {
      //     id: 'c2',
      //     firstName: 'Julie',
      //     lastName: 'Jones',
      //     areas: ['frontend', 'career'],
      //     description:
      //       'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
      //     hourlyRate: 30
      //   }
      // ],
      requests: [],
    }
  },
  getters: {
    coaches(state) {
      return state.coaches
    },
    hasCoaches(state) {
      return state.coaches && state.coaches.length > 0;
    },
    getRequest(state) {
      return state.requests;
    },
    hasRequests(state) {
      return state.requests && state.requests.length > 0;
    },
  },
  mutations: {
    AddRequest(state, payLoad) {
      // console.log('Add request payLoad', payLoad);
      state.requests.push(payLoad)
    },
    SetRequest(state, payLoad) {
      // console.log('Add request payLoad', payLoad);
      state.requests = payLoad
    },
    getMaxCoachId(state) {
      if (state.coaches.length === 0) {
        return 0; // Default value if there are no coaches
      }
      const ids = state.coaches.map(coach => parseInt(coach.id.replace('c', ''), 10));
      return Math.max(...ids) + 1;
    },
    RegisterNewCoach(state, newCoach) {
      state.coaches.push(newCoach);
    },
    SetCoaches(state,payLoad){
      state.coaches = payLoad

    }
  },
  actions: {

    //#region For Registering a new Coach
    async RegisterNewCoach({ commit, state }, payLoad) {
      const maxId = state.coaches.length === 0 ? 1 : state.coaches.map(coach => parseInt(coach.id.replace('c', ''), 10)).reduce((a, b) => Math.max(a, b)) + 1;
  

      const areasOfExpertise = Array.isArray(payLoad.areasOfExpertise) ? [...payLoad.areasOfExpertise] : [];
  
      // const newCoach = {
      //   ...payLoad,
      //   id: 'c' + maxId,
      //   areas: areasOfExpertise
      // };

      const newCoach = {
        id: 'c' + maxId,
        firstName: payLoad.firstName, 
        lastName: payLoad.lastName, 
        hourlyRate: payLoad.hourlyRate, 
        description: payLoad.description, 
        areas: areasOfExpertise
      };

      // console.log('newCoach Reached' , newCoach);

  
      commit('RegisterNewCoach', newCoach);
  
      try {
        const response = await fetch(`https://coachingapp-01-default-rtdb.firebaseio.com/${newCoach.id}.json`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newCoach)
        });
  
        if (!response.ok) {
          throw new Error('Failed to save coach data');
        }
  
        // const responseData = await response.json();
        // console.log('responseData', responseData);
      } catch (error) {
        console.error(error);
      }
    },
    //#endregion

    //#region For Loading of Coaches that we Register via (RegisterNewCoach acitons)
    async LoadCoaches(context, payLoad) {
      console.log('payLoad', payLoad);
      try {
        // const response = await fetch(`https://coachingapp-01-default-rtdb.firebaseio.com/.jso`, {
        const response = await fetch(`https://coachingapp-01-default-rtdb.firebaseio.com/.json`, {
          method: 'GET',
        });
  
        if (!response.ok) {
          const error = new Error(response.statusText || 'Failed to fetch coach data');
          throw error;
        }
  
        const responseData = await response.json();
  
        const coaches = [];
        for (const key in responseData) {
          const coach = {
            id: key,
            firstName: responseData[key].firstName,
            lastName: responseData[key].lastName,
            hourlyRate: responseData[key].hourlyRate,
            description: responseData[key].description,
            areas: responseData[key].areas
          };
          coaches.push(coach);
        }
  
        context.commit('SetCoaches', coaches);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    //#endregion

    //#region For sending Messages to a Coach or For Contacting a Coach
    async ContactCoach(context, payLoad) {
      const newRequest = {
        // id : new Date().toISOString(),
        coachId: payLoad.coachId,
        userEmail: payLoad.userEmail,
        message: payLoad.message
      };
    
      try {
        const response = await fetch(`https://coachingapp-01-default-rtdb.firebaseio.com/requests/${payLoad.coachId}.json`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newRequest) 
        });

        if (!response.ok) {
          const error = new Error (responseData.message || 'Failed to send request')
          throw error;
        }
    
        const responseData = await response.json();
        newRequest.id = responseData.name;
      
        // console.log('responseData of ContactCoach',responseData);
        if (responseData) {
          context.commit('AddRequest', newRequest);
        }
      } catch (error) {
        console.error('Error in ContactCoach:', error);
      }
    },
    //#endregion

    //#region THIS ACTION METHOD IS USED FOR FETCHING ALL THE REQUESTS MESSAGAS THAT WE SENT via (ContactCoach acitons)  
    async FetchCoachRequest(context){
      const response = await fetch(`https://coachingapp-01-default-rtdb.firebaseio.com/requests/.json`, {
        method: 'GET',
      });
      if (!response.ok) {
        const error = new Error(response.statusText || "Failed to load request")
        throw error;
      }
      else{
        const responseData = await response.json();
        // console.log('responseData',responseData);
        
        const requests = []
        
        for (const coachId in responseData) {
          if (Object.prototype.hasOwnProperty.call(responseData, coachId)) {
            const coachRequests = responseData[coachId];
            for (const requestId in coachRequests) {
              if (Object.prototype.hasOwnProperty.call(coachRequests, requestId)) {
                const request = {
                  id: requestId,
                  coachId: coachRequests[requestId].coachId,
                  userEmail: coachRequests[requestId].userEmail,
                  message: coachRequests[requestId].message
                };
                requests.push(request);
                // console.log('requests',request);
              }
            }
          }
        }
        
    
        context.commit('SetRequest', requests);
      }
      
    },
    //#endregion
    
  }
});

export default store;