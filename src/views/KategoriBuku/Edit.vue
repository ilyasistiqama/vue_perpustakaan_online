<template>
    <div>
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Edit Kategori Buku</h5>
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

    <ButtonSubmit @click="actionEditCategory()" buttonText="Ubah" />
</template>
<script>
import ButtonSubmit from '../../components/ButtonSubmit.vue';
export default {
    data() {
        return {
            idParam: this.$route.params.id,
            form: {},
        }
    },
    components: {
        ButtonSubmit
    },
    methods: {
        getDataCategory() {
            this.axios.get(`${this.urlApi}category/${this.idParam}`, { 'headers': { 'Authorization': 'Bearer ' + localStorage.getItem('_token') } }).then(res => {
                this.form = res.data.data.category;
            }).catch((err) => {
                console.log(err.message);
            })
        },
        async actionEditCategory() {
            this.axios.post(`${this.urlApi}category/update/${this.idParam}`, {
                ...this.form
            }, {
                'headers': {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + localStorage.getItem('_token')
                }
            }).then((res) => {
                console.log(res)
                if (res.data.status == 200) {
                    this.Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: res.data.message
                    }).then((resp) => {
                        return this.$router.push({ name: 'kategori-buku' });
                    })
                } else {
                    return this.Swal.fire({
                        icon: 'warning',
                        title: 'Attention',
                        text: res.data.message.name
                    })
                }
            })
        }
    },
    mounted() {
        this.getDataCategory()
    },
}
</script>