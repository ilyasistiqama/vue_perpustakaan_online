<template>
    <div>
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Import Buku</h5>
                <div class="row mt-4">
                    <div class="col-lg-12">
                        <div class="mb-3">
                            <button @click="downloadTemplate" class="nav-link text-primary">Download Template</button>
                        </div>
                        <div class="mb-3">
                            <label for="formFile" class="form-label">Upload Excel</label>
                            <input class="form-control" type="file" id="formFile"
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                @change="uploadFile">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ButtonSubmit @click="actionImportBuku()" buttonText="Import" />
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
            file: null
        }
    },
    methods: {
        downloadTemplate() {
            this.axios.get(`${this.urlApi}book/download/template`, {
                'headers': { 'Authorization': 'Bearer ' + localStorage.getItem('_token') },
            }).then(res => {
                window.open(this.urlOnly + res.data.path, '_blank')
            }).catch((err) => {
                console.log(err.message);
            })
        },
        uploadFile(e) {
            const getFile = e.target.files[0];
            this.file = getFile;
        },
        actionImportBuku() {
            if (this.file == null || this.file == '' || this.file == undefined) {
                return this.Swal.fire({
                    icon: 'warning',
                    title: 'Attention',
                    text: 'Form Tidak Boleh Kosong'
                });
            }

            this.axios.post(`${this.urlApi}book/import/excel`,
                {
                    file_import: this.file
                },
                {
                    'headers': {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + localStorage.getItem('_token')
                    }
                }
            ).then(res => {
                if (res.data.status == 200) {
                    return this.Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: res.data.message,
                    }).then((res) => {
                        this.$router.push({ name: 'buku' });
                    })
                } else {
                    return this.Swal.fire({
                        icon: 'error',
                        title: 'Sorry',
                        text: res.data.message,
                    })
                }
            }).catch((err) => {
                return this.Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err.message,
                })
            })
        }

    },
    async mounted() {
    }
}
</script>
<style scoped></style>