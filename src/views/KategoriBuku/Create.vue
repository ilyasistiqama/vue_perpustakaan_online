<template>
    <div>
        <div class="card">
            <div class="card-body">
            <h5 class="card-title">Tambah Kategori Buku</h5>
            <div class="row mt-4">
                <div class="col-lg-12">
                    <div class="mb-3">
                        <label for="kategori-form" class="form-label">Kategori</label>
                        <input type="text" v-model="form.nama_kategori" class="form-control" id="kategori-form">
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
    <ButtonSubmit @click="actionCreateCategory()" buttonText="Tambah"/>
</template>
<script>
import ButtonSubmit from '../../components/ButtonSubmit.vue';
export default {
    data() {
        return {
            form: {
                nama_kategori: null,
            },
            token: localStorage.getItem('_token')
        }
    },
    components: {
        ButtonSubmit
    },
    methods: {
        async actionCreateCategory() {
            this.axios.post(`${this.urlApi}category/create`, {
                ...this.form
            }, {
                'headers': {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + localStorage.getItem('_token')
                }
            }).then((res) => {
                if(res.data.status == 201){
                    this.Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: res.data.message
                    }).then((resp) => {
                        return this.$router.push({ name: 'kategori-buku' });
                    })
                }else{
                    return this.Swal.fire({
                        icon: 'warning',
                        title: 'Attention',
                        text: res.data.message.name
                    })
                }
            })
        }
    }
}
</script>