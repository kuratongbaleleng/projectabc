<template>
  <div class="image-holder">
    <button class="btn btn-primary pull-right" @click="addImage()"><i class="fa fa-plus"></i> New Image
      <input type="file" @change="setUpFileUpload($event)" id="newImage">
    </button>
    <div class="image-list" v-if="data !== null">
      <div class="card" v-for="item, index in data">
        <img class="card-img-top" :src="config.BACKEND_URL + item.url" alt="Card image cap">
        <div class="card-body">
          <ul>
            <li @click="download(item)">Download</li>
            <li style="border-right: 0px;" @click="remove(item)">Delete</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
button input{
  display: none;
}
.image-holder{
  width: 100%;
  float: left;
}
.image-list{
  width: 100%;
  float: left;
  margin-top: 25px;
}
.card{
  width: 19%;
  margin-right: 1%;
  float: left;
  margin-bottom: 25px;
}
.card:hover{
  cursor: pointer;
  border: solid 1px #22b173;
}
.card-body{
  padding: 0px !important;
}
ul{
  list-style: none;
  width: 100%;
  float: left;
  height: 40px;
  margin: 0px;
  padding: 0px;
  line-height: 40px;
  background: #22b173;
  color: #fff;
}
ul li{
  width: 50%;
  float: left;
  text-align: center;
  border-right: solid 1px #028170;
}
ul li:hover{
  background: #028170;
  cursor: pointer;
}

@media screen (max-width: 992px){
  .item{
    width: 49%;
  }
}
</style>
<script>
import ROUTER from '../../router'
import AUTH from '../../services/auth'
import CONFIG from '../../config.js'
import axios from 'axios'
export default {
  mounted(){
    this.retrieve()
  },
  data(){
    return {
      user: AUTH.user,
      config: CONFIG,
      errorMessage: null,
      data: null,
      file: null
    }
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    },
    addImage(){
      $('#newImage')[0].click()
    },
    createFile(file){
      let fileReader = new FileReader()
      fileReader.readAsDataURL(event.target.files[0])
      this.upload()
    },
    setUpFileUpload(event){
      let files = event.target.files || event.dataTransfer.files
      if(!files.length){
        return false
      }else{
        this.file = files[0]
        this.createFile(files[0])
      }
    },
    upload(){
      let formData = new FormData()
      formData.append('file', this.file)
      formData.append('file_url', this.file.name)
      formData.append('account_id', this.user.userID)
      $('#loading').css({'display': 'block'})
      axios.post(this.config.BACKEND_URL + '/employees/upload', formData).then(response => {
        $('#loading').css({'display': 'none'})
        if(response.data !== null){
          this.retrieve()
        }
      })
    },
    retrieve(){
      let parameter = {
        condition: [{
          value: this.user.userID,
          column: 'account_id',
          clause: '='
        }]
      }
      this.APIRequest('account_images/retrieve', parameter).then(response => {
        if(response.data.length > 0){
          this.data = response.data
        }else{
          this.data = null
        }
      })
    },
    download(){
      //
    },
    remove(){
      //
    }
  }
}
</script>
