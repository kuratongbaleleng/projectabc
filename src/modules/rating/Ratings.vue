<template>
  <span>
    <span class="holder">
      <span class="text">
        Average Ratings
        <i v-bind:class="{'far': stars === 0 || i > stars || status === false, 'fas text-warning': i <= stars}" class="fa-star" v-for="i in 5"></i> <label v-if="status !== false">({{avg.toFixed(1)}})</label>
      </span>
      <button class="btn btn-primary pull-right" style="margin-top: 5px;" data-toggle="modal" data-target="#submitRatingModal" v-if="status === false">Submit</button>
    </span>
    <rating-create :payload="payload" :payloadValue="payloadValue" v-if="status === false"></rating-create>
  </span>
</template>
<script>
import ROUTER from '../../router'
import AUTH from '../../services/auth'
import CONFIG from '../../config.js'
import axios from 'axios'
export default {
  components: {
    'rating-create': require('modules/rating/Create.vue')
  },
  mounted(){
    this.retrieve()
  },
  data(){
    return {
      user: AUTH.user,
      config: CONFIG,
      total: 0,
      avg: 0,
      data: null,
      stars: 0,
      status: true
    }
  },
  props: ['payload', 'payloadValue'],
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    },
    retrieve(){
      let parameter = {
        account_id: this.user.userID,
        condition: [{
          value: this.payload,
          column: 'payload',
          clause: '='
        }, {
          value: this.payloadValue,
          column: 'payload_value',
          clause: '='
        }]
      }
      this.APIRequest('ratings/retrieve', parameter).then(response => {
        if(response.data !== null){
          this.data = response.data
          this.total = response.total
          this.avg = parseFloat(response.avg)
          this.stars = response.stars
          this.status = response.status
        }else{
          this.data = null
          this.total = 0
          this.avg = 0
          this.stars = 0
          this.status = true
        }
      })
    }
  }
}
</script>
<style scoped>
.holder{
  width: 100%;
  float: left;
}
.text{
  float: left;
}
.fa-star{
  padding-right: 5px;
  font-size: 16px;
}
.fa-star:hover{
  cursor: pointer;
}

</style>
