<template>

<div class="files-upload">
    
    <div class="list row row-xs" :class="{'list-thumb':context.attributes.listStyle=='thumbs'}">

        <div class="col-12 col-sm-6 col-md-4" v-for="(file, index) in context.model" :key="file.id">
            <div class="file">
                <div class="thumb"  @click="previewFile(index, file)" v-if="file.type=='image'" :style="{backgroundImage: `url('${ file.urlThumb}')` } "></div>
                <div class="thumb thumb-document"   @click="previewFile(index, file)" v-if="file.type=='file'" ><i class="icon icon-attach"></i></div>
                <div class="filename"  @click="previewFile(index, file)">{{file.filename}}</div>
                <div class="btn btn-delete" @click="deletePrompt(file)"><i class="icon icon-sm icon-close"></i></div>
            </div>
        </div>
        
        <div class="uploading" v-if="uploading">
            <div class="thumb" :style="'background-image:url('+uploading.thumb+')'"></div>
            <div class="filename">
                {{uploading.name}}
                <div class="loader mt-2"><div class="bar"></div></div>
            </div>
        </div>

    </div>
    
    <div class="btn btn-light upload-btn" :class="{'invalid': invalid}" >
        Seleccionar archivo
        <input type="file" @change="upload"  ref="file">
    </div>

    <div class="invalid-feedback d-block mt-1 mb-4" v-if="invalidFormat">Seleccione un archivo valido ({{filetypes}})</div>
    <!-- <div class="invalid-feedback d-block mt-1 mb-4" v-if="invalid">Debe subir al menos una imagen</div> -->


    <div class="lightbox" v-if="preview.show">
        <div class="backdrop" ></div>
        <div class="content">

            <div class="controls">
                <div class="filename">{{preview.file.filename}}</div>
                <div>
                    <div class="btn" v-b-tooltip.hover  title="Descargar" bottomleft @click="downloadFile(preview.file)"><i class="icon-cloud-download-2"></i></div>
                    <div class="btn" v-b-tooltip.hover  title="Eliminar" bottomleft @click="deletePrompt(preview.file)"><i class="icon-trashcan"></i></div>
                    <div class="btn" v-b-tooltip.hover  title="Cerrar" bottomleft @click="preview.show=false"><i class="icon icon-close-round"></i></div>
                </div>
            </div>

            <img class="image" :src="preview.file.url" />
            <!-- <div class="image" :style="{backgroundImage: `url('${ preview.file.url}')` } "></div> -->
        </div>
    </div>



</div>
</template>

<script>
import gql from 'graphql-tag'
import Tinybox from "vue-tinybox"

export default {
    name: "attachedFiles",
    components:{
        Tinybox,
    },
	props:{
        context: {
            type: Object,
            required: true
        },
    },
    computed: {
        files: {
            get: function() {
                return this.context.model || [];
            },
            set: function(newValue) {
                this.context.model = newValue;
            }
        }
    },
    data() {
        return {
            uploadedImage:{},
            uploading:false,
            invalid:false,
            invalidFormat:false,
            backgroundImage: null,
            API_URL: process.env.VUE_APP_API_URL,
            filetypes: ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pdf', 'zip', 'rar', '7z', 'odt', 'ods', 'ppt', 'pptx'],
            imagetypes: ['gif','png','jpeg','jpg'],
            
            preview:{
                file: '',
                show:false,
            }

        }
    },
	methods:{

        deletePrompt(item) {
			this.$dialog
			.confirm({
					title: 'Eliminar archivo',
					body: `¿Está seguro que desea eliminar el archivo <strong>"${item.filename} "</strong>?`
				},
				{
				okText: 'Eliminar',
				customClass: 'delete-prompt'
			})
			.then(() => {
				this.remove(item)
			})
        },
        

        previewFile(index, file){
            if(file.type=='image'){
                this.preview.images = this.context.model.map((file) =>{
                    return { src: file.url, thumbnail: file.urlThumb, index }
                }) 
                this.preview.index = index
                this.preview.show = true
                this.preview.file = file
            }else{  
                console.log('Descargo el archivo')
            }
        },

        downloadFile(file){
            console.log('download file')
            fetch(file.url)
            .then((response) => response.blob())
            .then((blob) => {
            saveAs(blob, file.filename);
            });
            // console.log('downloading', url);
        },

        
      	upload(event){
            this.invalidFormat = false
            var input = event.target;
			if (input.files && input.files[0]) {
                if( this.isAcceptedFile(input.files[0]) ){
                    
                    this.uploading=true;
					return this.$apollo.mutate({
						mutation: gql`mutation ($file:Upload! ){
							uploadFile(file : $file){
								id
                                url
                                urlThumb
                                filename
                                type
							}
						}`,
						variables: {
							file: input.files[0]
						}
					})
					.then( ({data}) => {
                        if( !Array.isArray(this.context.model)) this.context.model = []
                        this.context.model.push(data.uploadFile)
                        this.$emit('input',this.context.model)
                        this.uploading=false
                        return data.uploadFile;
					})
					.catch(err => {
                        console.log(err)
                        this.uploading=false;
						return false;
					});
				}else{
                    this.invalidFormat = true
                }	
			}
        },

        isAcceptedFile(file){
            let fileType = file.name.substr(file.name.lastIndexOf('.') + 1).toLowerCase()
            return this.filetypes.find(extension => extension == fileType) || this.imagetypes.find(extension => extension == fileType)
        },
		remove(file){ 
            const index = this.context.model.findIndex( (f) => (f.id == file.id))
            if(index>=0){ 
                this.context.model.splice(index,1)
                this.preview.show = false
                this.$emit('input',this.context.model)
            }
		},
	}
};
</script>

<style scoped lang="scss">

.list{
    // width: 100%;
    // display: flex;
    // flex-direction: column;

    .file{
        // width: 100%;
        border: 1px solid rgba(28,110,164,.2);
        margin: 4px 0;
        padding: 4px;
        border-radius: 3px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        flex-grow: 0;
        flex-shrink: 0;   
        cursor: pointer;

        .filename{
            flex-grow: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .btn-delete{
            color: #000;
        }
    }
}
.thumb{
    background-color:#f3f3f3;
    border-radius: 3px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    width: 48px;
    height: 48px;
    margin-right: 8px;
    flex-shrink:0;
}

.thumb-document{
    background-color: #f7f7f7;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    i{
        font-size: 18px;
        color: #005EB8;
    }
}
.uploading{
    width: 100%;
    border: 1px solid rgba(28,110,164,.2);
    margin: 4px 0;
    padding: 4px;
    border-radius: 3px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    flex-grow: 0;
    flex-shrink: 0;   
    cursor: pointer;

    .filename{
        flex-grow: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}

.upload-btn{
    // width: 140px;
    // height: 140px;
    border: 1px solid rgba(28,110,164,.2);
    margin: 4px 0;
    // border-radius: 3px;
    position:relative;
    display: flex;
    align-items: center;
    justify-content:center;
    background-color: #fff; 
    
    flex-grow: 0;
    flex-shrink: 0;
    cursor: pointer;
    
    input{
        opacity:0;
        position: absolute;
        z-index: 10;
        top: 0px;
        width: 100%;
        height: 100%;
        cursor: pointer;
    }
}


 @keyframes loader-animation {
     0% {
         left: -100%;
     }
     49% {
         left: 100%;
     }
     50% {
         left: 100%;
     }
     100% {
         left: -100%;
     }
 }
 .loader {
     height: 5px;
     width: 100%;
     overflow: hidden;
 }
 .loader .bar {
     position: relative;
     height: 2px;
     width: 100%;
     background-color: dodgerblue;
     animation-name: loader-animation;
     animation-duration: 3s;
     animation-iteration-count: infinite;
     animation-timing-function: ease-in-out;
 }




.list-thumb{
    // display: flex;
    // flex-wrap: wrap;
    // flex-direction: inherit;
}
.list-thumb .file{
    flex-direction: column;
    // width: 250px;
    // margin: 4px;
}
.list-thumb .file .thumb{
    width: 150px;
    height: 150px;
    margin: 18px auto;
}
.list-thumb .file i{
    font-size: 40px;
}
.list-thumb .file .filename{
    max-width: 100%;
    width: 100%;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border-top: 1px solid rgba(28, 110, 164, 0.2);
    padding: 10px;
    font-weight: 500;
}
.list-thumb .file .btn-delete{
    position: absolute;
    top: 3px;
    right: -5px;
    opacity: 0.5;
}





.lightbox{
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    text-align: center;
    top: 0;
    z-index: 1000;
}
.lightbox .content{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    z-index: 1010;
}
.lightbox .content .controls{
    width: 100%;
    height: 64px;
    top: 0px;
    position: absolute;
    padding: 0px 16px;
    z-index: 1010;
    display:flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(0, 0, 0,0.3);
}
.lightbox .content .controls .filename{
    color:#fff;
    padding: 8px 16px;
}
.lightbox .content .controls .btn{
    width: 46px !important;
    height: 46px !important;
    color:#fff;
    font-size: 20px;
}
.lightbox .backdrop{
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: rgba(0, 0, 0,0.8);
}

.lightbox .content .image{
    background-color: #222;
    // cursor: pointer;
    display: inline-block;
    max-height: 90%;
    max-width: 80%;
    // position: absolute;
    // background-size: contain;
}




</style>