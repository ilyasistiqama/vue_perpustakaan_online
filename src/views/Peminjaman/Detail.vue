<template>
    <!-- <div class="container"> -->
    <div class="card">
        <div class="card-body">
            <h3 class="card-title">Detail Peminjaman</h3>
            <h6 class="card-subtitle">{{ buku.judul }}</h6>
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12">
                    <div class="white-box text-center"><img :src="img" class="" alt="Foto Cover Buku"
                            style="width: 400px; height: auto;"></div>
                </div>
            </div>
            <div class="row">
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
                                    <td width="390">Peminjam</td>
                                    <td v-if="member.name">{{ member.name }}</td>
                                    <td v-else>-</td>
                                </tr>
                                <tr>
                                    <td width="390">Email Peminjam</td>
                                    <td v-if="member.email">{{ member.email }}</td>
                                    <td v-else>-</td>
                                </tr>
                                <tr>
                                    <td>Tanggal Peminjaman</td>
                                    <td v-if="peminjaman.tanggal_peminjaman">{{ peminjaman.tanggal_peminjaman }}</td>
                                    <td v-else>-</td>
                                </tr>
                                <tr>
                                    <td>Tanggal Pengembalian</td>
                                    <td v-if="peminjaman.tanggal_pengembalian">{{ peminjaman.tanggal_pengembalian }}</td>
                                    <td v-else>-</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="mt-3 d-flex justify-content-center">
                        <h5 v-if="status == 3">Telah di Kembalikan pada Tanggal : {{ peminjaman.tanggal_pengembalian }}</h5>
                        <button class="btn btn-primary btn-rounded" v-else type="button" data-bs-toggle="modal"
                            data-bs-target="#exampleModal">Kembalikan Buku</button>
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
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Kembalikan Buku</h1>
                    <button type="button" class="btn-close" id="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="mb-3">
                                <label for="pengembalian-form" class="form-label">Tanggal Pengembalian</label>
                                <input type="date" class="form-control" id="pengembalian-form" :min="tanggal_kembali" :max="tanggal_kembali" 
                                    v-model="tanggal_kembali">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Kembali</button>
                    <button type="button" class="btn btn-primary" @click="actionReturnBuku()">Simpan</button>
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
            peminjaman: [],
            member: [],
            img: null,
            nama_kategori: null,
            role: localStorage.getItem('_role'),
            status: null,
            tanggal_kembali: new Date().toISOString().slice(0, 10),
        }
    },
    methods: {
        async getDetailBuku() {
            this.axios.get(`${this.urlApi}peminjaman/show/${this.idParam}`, { 'headers': { 'Authorization': 'Bearer ' + localStorage.getItem('_token') } }).then(res => {
                this.status = res.data.data.book.status;
                this.buku = res.data.data.book.book;
                this.peminjaman = res.data.data.book;
                this.member = res.data.data.book.member;

                if (res.data.data.book.book.path != null) {
                    this.img = this.urlOnly + 'storage/' + res.data.data.book.book.path;
                }
            }).catch((err) => {
                console.log(err.message);
            })
        },

        actionReturnBuku() {
            let convert_tanggal_kembali = new Date(this.tanggal_kembali)
            convert_tanggal_kembali = this.dateFormater(convert_tanggal_kembali)
            this.closeModal();
            this.axios.post(
                `${this.urlApi}peminjaman/book/${this.idParam}/return`,
                {
                    tanggal_pengembalian: convert_tanggal_kembali,
                },
                {
                    'headers': {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + localStorage.getItem('_token')
                    }
                }
            ).then(res => {
                if (res.data.status == 200) {
                    this.Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: res.data.message,
                    }).then(() => {
                        return this.getDetailBuku();
                    })
                } else {
                    console.log(res.data.message);
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
        },

        closeModal() {
            document.getElementById('btn-close').click();
        },
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