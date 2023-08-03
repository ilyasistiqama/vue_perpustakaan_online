<template>
    <!-- <div class="container"> -->
    <div class="card">
        <div class="card-body">
            <h3 class="card-title">Detail Buku</h3>
            <h6 class="card-subtitle">{{ buku.judul }}</h6>
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12">
                    <div class="white-box text-center"><img :src="img" class="" alt="Foto Cover Buku"
                            style="width: 400px; height: auto;"></div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12">
                    <h4 class="box-title mt-5">Deskripsi Buku</h4>
                    <p>Lorem Ipsum available,but the majority have suffered alteration in some form,by injected
                        humour,or randomised words which don't look even slightly believable.but the majority have
                        suffered alteration in some form,by injected humour</p>
                    <div v-if="role != 'admin'">
                        <button class="btn btn-primary btn-rounded" v-if="buku.stok > 0" type="button"
                            data-bs-toggle="modal" data-bs-target="#exampleModal">Pinjam Sekarang</button>
                        <button class="btn btn-primary btn-rounded" v-else disabled>Stok Habis</button>
                    </div>
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12">
                    <h3 class="box-title mt-5">General Info</h3>
                    <div class="table-responsive">
                        <table class="table table-striped table-product">
                            <tbody>
                                <tr>
                                    <td width="390">Judul</td>
                                    <td v-if="buku.judul">{{ buku.judul }}</td>
                                    <td v-else>-</td>
                                </tr>
                                <tr>
                                    <td>Kode Buku</td>
                                    <td v-if="buku.kode_buku">{{ buku.kode_buku }}</td>
                                    <td v-else>-</td>
                                </tr>
                                <tr>
                                    <td>Nama Kategori Buku</td>
                                    <td v-if="nama_kategori">{{ nama_kategori }}</td>
                                    <td v-else>-</td>
                                </tr>
                                <tr>
                                    <td>Penerbit</td>
                                    <td v-if="buku.penerbit">{{ buku.penerbit }}</td>
                                    <td v-else>-</td>
                                </tr>
                                <tr>
                                    <td>Pengarang</td>
                                    <td v-if="buku.pengarang">{{ buku.pengarang }}</td>
                                    <td v-else>-</td>
                                </tr>
                                <tr>
                                    <td>Tahun Terbit</td>
                                    <td v-if="buku.tahun">{{ buku.tahun }}</td>
                                    <td v-else>-</td>
                                </tr>
                                <tr>
                                    <td>Stok Buku</td>
                                    <td v-if="buku.stok">{{ buku.stok }} Buah</td>
                                    <td v-else>-</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Pinjam Buku</h1>
                    <button type="button" class="btn-close" id="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="mb-3">
                                <label for="peminjaman-form" class="form-label">Tanggal Peminjaman</label>
                                <input type="date" class="form-control" id="peminjaman-form" :min="tanggal_pinjam"
                                    :max="tanggal_pinjam" v-model="tanggal_pinjam">
                            </div>
                            <div class="mb-3">
                                <label for="pengembalian-form" class="form-label">Tanggal Pengembalian</label>
                                <input type="date" class="form-control" id="pengembalian-form" :min="tanggal_pinjam"
                                    v-model="tanggal_kembali">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Kembali</button>
                    <button type="button" class="btn btn-primary" @click="actionPinjamBuku()">Simpan</button>
                </div>
            </div>
        </div>
    </div>
    <!-- </div> -->
</template>
<script>
export default {
    data() {
        return {
            idParam: this.$route.params.id,
            buku: [],
            img: null,
            nama_kategori: null,
            role: localStorage.getItem('_role'),
            tanggal_pinjam: new Date().toISOString().slice(0, 10),
            tanggal_kembali: new Date().toISOString().slice(0, 10),
        }
    },
    methods: {
        async getDetailBuku() {
            this.axios.get(`${this.urlApi}book/${this.idParam}`, { 'headers': { 'Authorization': 'Bearer ' + localStorage.getItem('_token') } }).then(res => {
                this.buku = res.data.data.book;
                if (res.data.data.book.path != null) {
                    this.img = this.urlOnly + 'storage/' + res.data.data.book.path;
                }
                this.nama_kategori = res.data.data.book.category.nama_kategori
            }).catch((err) => {
                console.log(err.message);
            })
        },

        actionPinjamBuku() {
            let convert_tanggal_pinjam = new Date(this.tanggal_pinjam)
            let convert_tanggal_kembali = new Date(this.tanggal_kembali)
            convert_tanggal_pinjam = this.dateFormater(convert_tanggal_pinjam)
            convert_tanggal_kembali = this.dateFormater(convert_tanggal_kembali)
            this.closeModal();
            this.axios.post(
                `${this.urlApi}peminjaman/book/${this.idParam}/member/` + localStorage.getItem('_id_user'),
                {
                    id_buku: this.idParam,
                    id_member: localStorage.getItem('_id_user'),
                    tanggal_peminjaman: convert_tanggal_pinjam,
                    tanggal_pengembalian: convert_tanggal_kembali,
                    bypass: 1
                },
                {
                    'headers': {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + localStorage.getItem('_token')
                    }
                }
            ).then(res => {
                if (res.data.status == 201) {
                    this.Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: res.data.message,
                    }).then(() => {
                        return this.getDetailBuku();
                    })
                } else {
                    this.Swal.fire({
                        icon: 'error',
                        title: 'Sorry',
                        text: res.data.message,
                    })
                }
            }).catch((err) => {
                this.Swal.fire({
                    icon: 'error',
                    title: 'Sorry',
                    text: 'terjadi kesalahan saat input peminjaman',
                })
            })
        },

        closeModal(){
            document.getElementById('btn-close').click();
        },  

        dateFormater(date) {
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var day = date.getDate();
            // get month from 0 to 11
            var month = date.getMonth();
            // conver month digit to month name
            month = months[month];
            var year = date.getFullYear();

            // show date in two digits
            if (day < 10) {
                day = '0' + day;
            }

            // now we have day, month and year
            // arrange them in the format we want
            return month + ' ' + day + ', ' + year;
        }


    },
    async mounted() {
        await this.getDetailBuku();
    }

}
</script>
<style scoped>
/* body {
    background-color: #edf1f5;
    margin-top: 20px;
} */

.card {
    margin-bottom: 30px;
}

.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    /* background-clip: border-box; */
    /* border: 0 solid transparent; */
    /* border-radius: 0; */
}

.card .card-subtitle {
    font-weight: 300;
    margin-bottom: 10px;
    color: #8898aa;
}

.table-product.table-striped tbody tr:nth-of-type(odd) {
    background-color: #f3f8fa !important
}

.table-product td {
    border-top: 0px solid #dee2e6 !important;
    color: #728299 !important;
}
</style>