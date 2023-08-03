<template>
    <div>
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Tambah Buku</h5>
                <div class="row mt-4">
                    <div class="col-lg-12">
                        <div class="mb-3">
                            <label for="judul-form" class="form-label">Judul</label>
                            <input type="text" class="form-control" id="judul-form" v-model="form.judul">
                        </div>
                        <div class="mb-3">
                            <label for="pengarang-form" class="form-label">Pengarang</label>
                            <input type="text" class="form-control" id="pengarang-form" v-model="form.pengarang">
                        </div>
                        <div class="mb-3">
                            <label for="penerbit-form" class="form-label">Penerbit</label>
                            <input type="text" class="form-control" id="penerbit-form" v-model="form.penerbit">
                        </div>
                        <div class="mb-3">
                            <label for="kategori-form" class="form-label">Kategori</label>
                            <select class="form-select" v-model="form.category_id">
                                <option v-for="val in kategori" :value="val.id">{{ val.nama_kategori }}</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="tahun-terbit-form" class="form-label">Tahun Terbit</label>
                            <input type="number" class="form-control" id="tahun-terbit-form" min="0"
                                onkeypress="return /[0-9a-zA-Z]/i.test(event.key)" v-model="form.tahun">
                        </div>
                        <div class="mb-3">
                            <label for="stok-form" class="form-label">Stok</label>
                            <input type="number" class="form-control" id="stok-form" min="0"
                                onkeypress="return /[0-9a-zA-Z]/i.test(event.key)" v-model="form.stok">
                        </div>
                        <div class="mb-3" v-if="imgSrc">
                            <img id="image" class="text-center" :src="imgSrc" v-if="imgSrc" />
                        </div>
                        <div class="mb-3">
                            <label for="formFile" class="form-label">Upload Image</label>
                            <input class="form-control" type="file" id="formFile" accept="image/*" @change="preview">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ButtonSubmit @click="actionCreateBook()" buttonText="Tambah" />
    </div>
</template>
<script>
import ButtonSubmit from '../../components/ButtonSubmit.vue';
export default {
    components: {
        ButtonSubmit,
    },
    data() {
        return {
            form: {
                judul: null,
                pengarang: null,
                penerbit: null,
                category_id: null,
                tahun: null,
                stok: null,
                path: null,
            },
            imgSrc: null,
            kategori: [],
        }
    },
    methods: {
        preview(e) {
            const file = e.target.files[0];
            this.form.path = file;
            this.imgSrc = URL.createObjectURL(file);
        },
        async getCategory() {
            this.axios.get(`${this.urlApi}category/all/all`, { 'headers': { 'Authorization': 'Bearer ' + localStorage.getItem('_token') } }).then(res => {
                this.kategori = res.data.data.categories
            }).catch((err) => {
                console.log(err.message);
            })
        },
        async actionCreateBook() {
            this.axios.post(`${this.urlApi}book/create`, {
                ...this.form,
            }, {
                'headers': {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + localStorage.getItem('_token')
                }
            }).then((res) => {
                if (res.data.status == 201) {
                    this.Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: res.data.message
                    }).then((resp) => {
                        return this.$router.push({ name: 'buku' });
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
    async mounted() {
        await this.getCategory();
    }
}
</script>
<style scoped>
#image {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    width: 15rem;
    height: 15rem;
}
</style>