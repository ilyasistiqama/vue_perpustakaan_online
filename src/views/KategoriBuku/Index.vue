
<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">List Kategori Buku</h5>

            <div class="row mt-4">
                <div class="col-lg-3 mt-1">
                    <router-link :to="{ name: 'kategori-buku-create' }" class="btn btn-primary w-100"><font-awesome-icon
                            icon="fa-solid fa-plus" />
                        Tambah Kategori Buku</router-link>
                </div>
                <div class="col-lg-9 mt-1">
                    <input type="text" class="form-control" v-model="search" id="formControlSearch"
                        placeholder="Search in here" @keyup="filterSearch($event.target.value)">
                </div>
            </div>
            <div class="table-responsive">
                <table class="table table-bordered border-primary mt-3">
                    <thead>
                        <tr>
                            <th style="width: 5%;" scope="col">#</th>
                            <th scope="col">Nama</th>
                            <th style="width: 10%;" scope="col">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(kategori, index) in listKategori.data" :key="kategori.id">
                            <th scope="row">{{ (listKategori.current_page - 1) * listKategori.per_page + (index + 1) }}</th>
                            <td>{{ kategori.nama_kategori }}</td>
                            <td>
                                <div class="d-flex justify-content-center">
                                    <div class="btn-group me-2">
                                        <router-link :to="{ name: 'kategori-buku-edit', params: { id: kategori.id } }"
                                            class="badge text-bg-warning">Edit</router-link>
                                    </div>
                                    <div class="btn-group me-2">
                                        <button class="badge text-bg-danger"
                                            @click="actionDelete(kategori.id)">Hapus</button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div class="pagination justify-content-end">
                    <vue-awesome-paginate :total-items="listKategori.total" :items-per-page="listKategori.per_page"
                        :max-pages-shown="3" v-model="page" :on-click="onClickHandler" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            page: 1,
            listKategori: [],
            search: null,
        }
    },
    methods: {
        async getKategoriBuku() {
            await this.axios.get(`${this.urlApi}category/all`, {
                'headers': {
                    'Authorization': 'Bearer ' + localStorage.getItem('_token')
                },
                'params': {
                    page: this.page,
                    search: this.search,
                    per_page: 10
                },
            }).then((res) => {
                this.listKategori = res.data.data.categories
            })
        },
        async onClickHandler(page) {
            this.page = page;
            await this.getKategoriBuku();
        },

        filterSearch: function (value) {
            if (value == null || value == '') {
                this.search = ''
                this.page = 1
                this.getKategoriBuku()
            } else {
                this.search = value
                this.page = 1
                this.getKategoriBuku()
            }
        },

        actionDelete(id) {
            this.Swal.fire({
                title: "Attention",
                text: "Yakin menghapus data?",
                icon: 'warning',
                showCancelButton: true,
                // confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ya',
                cancelButtonText: 'Tidak',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.axios.delete(`${this.urlApi}category/${id}/delete`, { 'headers': { 'Authorization': 'Bearer ' + localStorage.getItem('_token') } }).then(res => {
                        if (res.data.status == 200) {
                            this.Swal.fire({
                                icon: 'success',
                                title: 'Success',
                                text: res.data.message,
                            }).then(() => {
                                this.page = 1
                                this.getKategoriBuku()
                            })
                        } else {
                            this.Swal.fire({
                                icon: 'warning',
                                title: 'Attention',
                                text: res.data.message.message,
                            })
                        }
                    }).catch((err) => {
                        console.log(err.message);
                    })
                }
            })
        }

    },
    async mounted() {
        await this.getKategoriBuku();
    }
}
</script>
<style>
.pagination-container {
    display: flex;
    column-gap: 10px;
}

.paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgb(242, 242, 242);
    border: 1px solid rgb(217, 217, 217);
    color: black;
}

.paginate-buttons:hover {
    background-color: #d8d8d8;
}

.active-page {
    background-color: #3498db;
    border: 1px solid #3498db;
    color: white;
}

.active-page:hover {
    background-color: #2988c8;
}
</style>