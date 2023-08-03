
<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">List Buku</h5>

            <div class="row mt-4">
                <div class="col-lg-2 mt-1" v-if="role == 'admin'">
                    <router-link :to="{ name: 'buku-create' }" class="btn btn-primary w-100"><font-awesome-icon
                            icon="fa-solid fa-plus" />
                        Tambah Buku</router-link>
                </div>
                <div class="col-lg-2 mt-1">
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle col-12" type="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Export/Import
                        </button>
                        <ul class="dropdown-menu">
                            <li><button class="dropdown-item" @click="exportTo('pdf')">Export to PDF</button></li>
                            <li><button class="dropdown-item" @click="exportTo('excel')">Export to Excel</button></li>
                            <router-link :to="{ name: 'buku-import' }" class="dropdown-item" v-if="role == 'admin'">Import Excel</router-link>
                        </ul>
                    </div>
                </div>
                
                <div v-if="role == 'admin'" class="col-lg-8 mt-1">
                    <input type="text" class="form-control" v-model="search" id="formControlSearch"
                        placeholder="Search in here" @keyup="filterSearch($event.target.value)">
                </div>
                <div v-else class="col-lg-10 mt-1">
                    <input type="text" class="form-control" v-model="search" id="formControlSearch"
                        placeholder="Search in here" @keyup="filterSearch($event.target.value)">
                </div>
            </div>
            <div class="table-responsive">
                <table class="table table-bordered border-primary mt-3">
                    <thead>
                        <tr>
                            <th style="width: 5%;" scope="col">#</th>
                            <th scope="col">Foto</th>
                            <th scope="col">Judul</th>
                            <th scope="col">Kategori</th>
                            <th style="width: 10%;" scope="col">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(buku, index) in listBuku.data" :key="buku.id">
                            <th scope="row">{{ (listBuku.current_page - 1) * listBuku.per_page + (index + 1) }}</th>
                            <td>
                                <img v-if="buku.path != null" :src="urlOnly + 'storage/' + buku.path"
                                    style="width: 90px; height: 90px" alt="Foto Buku">
                                <p class="fst-italic" v-else>Tidak ada Gambar</p>
                            </td>
                            <td>{{ buku.judul }}</td>
                            <td>{{ buku.category.nama_kategori }}</td>
                            <td>
                                <div class="d-flex justify-content-center">
                                    <div class="btn-group me-2" v-if="role == 'admin'">
                                        <router-link :to="{ name: 'buku-edit', params: { id: buku.id } }"
                                            class="badge text-bg-warning">Edit</router-link>
                                    </div>
                                    <div class="btn-group me-2">
                                        <router-link :to="{ name: 'buku-detail', params: { id: buku.id } }"
                                            class="badge text-bg-info">Detail</router-link>
                                    </div>
                                    <div class="btn-group me-2" v-if="role == 'admin'">
                                        <button class="badge text-bg-danger" @click="actionDelete(buku.id)">Hapus</button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="pagination justify-content-end">
                    <vue-awesome-paginate :total-items="listBuku.total" :items-per-page="listBuku.per_page"
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
            listBuku: [],
            search: null,
            role: localStorage.getItem('_role')
        }
    },
    methods: {
        async getBuku() {
            await this.axios.get(`${this.urlApi}book/all`, {
                'headers': {
                    'Authorization': 'Bearer ' + localStorage.getItem('_token')
                },
                'params': {
                    page: this.page,
                    search: this.search,
                    per_page: 10
                },
            }).then((res) => {
                this.listBuku = res.data.data.books
            })
        },
        async onClickHandler(page) {
            this.page = page;
            await this.getBuku();
        },

        filterSearch: function (value) {
            if (value == null || value == '') {
                this.search = ''
                this.page = 1
                this.getBuku()
            } else {
                this.search = value
                this.page = 1
                this.getBuku()
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
                    this.axios.delete(`${this.urlApi}book/${id}/delete`, { 'headers': { 'Authorization': 'Bearer ' + localStorage.getItem('_token') } }).then(res => {
                        if (res.data.status == 200) {
                            this.Swal.fire({
                                icon: 'success',
                                title: 'Success',
                                text: res.data.message,
                            }).then(() => {
                                this.page = 1
                                this.getBuku()
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
        },

        exportTo(type) {
            this.axios.get(`${this.urlApi}book/export/${type}`, {
                'headers': { 'Authorization': 'Bearer ' + localStorage.getItem('_token') },
            }).then(res => {
                window.open(this.urlOnly + res.data.path, '_blank')
            }).catch((err) => {
                console.log(err.message)
            })
        },

        importToExcel() {
            //
        }

    },
    async mounted() {
        await this.getBuku();
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