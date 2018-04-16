var app = new Vue({
  el: '#app',

  data: {
    name: '',
    kills: '0',
    wins: '0',
    text: '',
  },

  computed: {

  },
  methods: {
    searchName: function(){
      console.log('in search name');
      axios.post("/api/", {
        text: this.text
      }).then(response => {
        console.log('in response');
        console.log(response.data.name);
        name:  response.data.name;
        console.log('kills');

        this.kills = response.data.kills;
        this.wins = response.data.games;
        console.log(kills);

    return true;
        }).catch(err => {
        });

      },

      addKill: function(){
        axios.post("/api/kills/", {
          text: this.text
        }).then(response => {
          this.kills = response.data.kills;

          console.log('kills frmo addkill');
          console.log(response.data.kills);

      return true;
          }).catch(err => {
          });
        },


        addWin: function(){
          axios.post("/api/wins/", {
            text: this.text
          }).then(response => {
            this.wins = response.data.games;



        return true;
            }).catch(err => {
            });
          }

    // squadPlus: function(){
    //     axios.put("/" + item.id, {
    //     }
    // },
    //
    // showAll: function() {
    //   this.solor +=1;
    //   this.show = 'active';
    //   this.solo = this.solor;
    //
    // },
  }
});
