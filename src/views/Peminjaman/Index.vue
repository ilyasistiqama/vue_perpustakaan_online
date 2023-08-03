
<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">List Peminjaman</h5>

            <!-- <div class="row mt-4">
                <div class="col-lg-12 mt-1">
                    <input type="text" class="form-control" v-model="search" id="formControlSearch"
                        placeholder="Search in here" @keyup="filterSearch($event.target.value)">
                </div>
            </div> -->
            <div class="table-responsive">
                <table class="table table-bordered border-primary mt-3">
                    <thead>
                        <tr>
                            <th class="text-center" style="width: 5%;" scope="col" rowspan="2">#</th>
                            <th class="text-center" scope="col" rowspan="2">Foto</th>
                            <th class="text-center" scope="col" rowspan="2">Peminjam</th>
                            <th class="text-center" scope="col" rowspan="2">Judul</th>
                            <th class="text-center" scope="col" colspan="2">Tanggal</th>
                            <th class="text-center" scope="col" rowspan="2">Status</th>
                            <th class="text-center" scope="col" rowspan="2">Aksi</th>
                        </tr>
                        <tr>
                            <th class="text-center" scope="col">Peminjaman</th>
                            <th class="text-center" scope="col">Pengembalian</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="banyak_data == 0">
                            <td colspan="8" class="text-center">Tidak ada Data.</td>
                        </tr>
                        <tr v-else v-for="(peminjaman, index) in listPeminjaman.data" :key="peminjaman.id">
                            <th scope="row">{{ (listPeminjaman.current_page - 1) * listPeminjaman.per_page + (index + 1) }}</th>
                            <td>
                                <img v-if="peminjaman.book.path != null" :src="urlOnly + 'storage/' + peminjaman.book.path"
                                    style="width: 90px; height: 90px" alt="Foto Buku">
                                <p class="fst-italic" v-else>Tidak ada Gambar</p>
                            </td>
                            <td>{{ peminjaman.member.name }}</td>
                            <td>{{ peminjaman.book.judul }}</td>
                            <td>{{ peminjaman.tanggal_peminjaman }}</td>
                            <td>{{ peminjaman.tanggal_pengembalian }}</td>
                            <td>
                                <span v-if="peminjaman.status == '2'" class="badge text-bg-warning">Dipinjam</span>
                                <span v-if="peminjaman.status == '3'" class="badge text-bg-success">Dikembalikan</span>
                            </td>
                            <td>
                                <div class="d-flex justify-content-center">
                                    <div class="btn-group me-2">
                                        <router-link :to="{ name: 'peminjaman-detail', params: { id: peminjaman.id } }"
                                            class="badge text-bg-info">Detail</router-link>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="pagination justify-content-end">
                    <vue-awesome-paginate :total-items="listPeminjaman.total" :items-per-page="listPeminjaman.per_page"
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
            listPeminjaman: [],
            banyak_data: 0,
        }
    },
    methods: {
        async getPeminjaman() {
            await this.axios.get(`${this.urlApi}peminjaman`, {
                'headers': {
                    'Authorization': 'Bearer ' + localStorage.getItem('_token')
                },
                'params': {
                    page: this.page,
                    per_page: 10
                },
            }).then((res) => {
                this.listPeminjaman = res.data.data.peminjaman
                this.banyak_data = res.data.data.peminjaman.data.length
            })
        },
        async onClickHandler(page) {
            this.page = page;
            await this.getPeminjaman();
        },

    },
    async mounted() {
        await this.getPeminjaman();
    },

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