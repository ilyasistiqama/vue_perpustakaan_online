<template>
    <section class=" gradient-form">
        <div class="container py-5 ">
            <div class="row d-flex justify-content-center align-items-center ">
                <div class="col-xl-10">
                    <div class="card rounded-3 text-black">
                        <div class="row g-0">
                            <div class="col-lg-6">
                                <div class="card-body p-md-5 mx-md-4">

                                    <div class="text-center">
                                        <img src="../../assets/logo-perpus.png" style="width: 185px;" alt="logo">
                                        <h4 class="mt-1 mb-5 pb-1">Mari Membaca Untuk Masa Depan</h4>
                                    </div>

                                    <form>
                                        <p>Please register to your account</p>

                                        <div class="form-outline mb-4">
                                            <input v-model="form.username" type="username" id="form-username"
                                                class="form-control" />
                                            <label class="form-label" for="form-username">Username</label>
                                        </div>

                                        <div class="form-outline mb-4">
                                            <input v-model="form.name" type="name" id="form-name" class="form-control" />
                                            <label class="form-label" for="form-name">Name</label>
                                        </div>

                                        <div class="form-outline mb-4">
                                            <input v-model="form.email" type="email" id="form-email" class="form-control" />
                                            <label class="form-label" for="form-email">Email</label>
                                        </div>

                                        <div class="form-outline mb-4">
                                            <input v-model="form.password" type="password" id="form-password"
                                                class="form-control" />
                                            <label class="form-label" for="form-password">Password</label>
                                        </div>

                                        <div class="form-outline mb-4">
                                            <input v-model="form.confirm_password" type="password"
                                                id="form-confirm-password" class="form-control" />
                                            <label class="form-label" for="form-confirm-password">Confirm Password</label>
                                        </div>

                                        <div class="text-center pt-1 mb-5 pb-1"><button @click="register(form)"
                                                class="btn btn-outline-danger btn-block fa-lg mb-3"
                                                type="button">Register</button>

                                        </div>

                                        <div class="d-flex align-items-center justify-content-center pb-4">
                                            <p class="mb-0 me-2">Have an account?</p>
                                            <router-link :to="{ name: 'login' }" class="link-info"> <button type="button"
                                                    class="btn btn-outline-danger">Login here</button></router-link>


                                        </div>

                                    </form>

                                </div>
                            </div>
                            <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
                                <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                                    <h4 class="mb-4">Sejarah Singkat</h4>
                                    <p class="small mb-0">Kantor Perpustakaan Umum Daerah Kabupaten Banggai dibentuk
                                        berdasarkan keputusan Bupati Banggai Nomor : 351/AB-250/1982, kemudian pada Tahun
                                        1994 mendagri mengeluarkan Keputusan Nomor 56 Tahun 1994 tentang Pedoman Organisasi
                                        dan Tata Kerja Perpustakaan Umum Kabupaten/Kotamadya Daerah Tkt II. Dengan dasar itu
                                        Pemerintah Kabupaten Banggai mengeluarkan Peraturan Daerah Nomor 3 Tahun 1993
                                        tentang Sruktur Organisasi dan Tata Kerja Perpustakaan Umum Daerah Kabupaten
                                        Bnaggai. Selanjutnya pada otonomi daerah, Perpustakaan mengalami 3 (tiga) kali
                                        perubahan nama dan srtuktur organisasi dari Perpustakaan Umum Daerah Kabupaten
                                        Banggai berdasarkan PERDA Nomor 5 Tahun 2006 berubah lagi menjadi Kantor
                                        Perpustakaan Arsip dan Dokumentasi Kabupaten Banggai. Kemudian berdasarkan PP Nomor
                                        18 Tahun 2016 Tentang Perangkat Daerah , melahirkan Perda Nomor 04 Tahun 2016
                                        Tentang Pembentukan dan Susunan Perangkat Daerah Kabupaten Banggai Maka Selanjutnya
                                        berubah menjadi Dinas Perpustakaan dan Kearsipan Kabupaten Banggai sampai dengan
                                        sekarang.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>

export default {
    data() {
        return {
            form: {
                username: '',
                email: '',
                name: '',
                password: '',
                confirm_password: '',
            },
            errors: [],
        }
    },
    methods: {
        async register(form) {
            this.errors = [];

            if (!this.form.username) {
                this.errors.push('Username Required.');
            }
            if (!this.form.email) {
                this.errors.push('Email Required.');
            }
            if (!this.form.name) {
                this.errors.push('Name Required.');
            }
            if (!this.form.password) {
                this.errors.push('Password Required.');
            }
            if (!this.form.confirm_password) {
                this.errors.push('Confirm Password Required.');
            }

            if (this.errors.length != 0) {
                let message = '<ul>';
                this.errors.forEach(el => {
                    message += '<li style="text-align:justify;">' + el + '</li>'
                })
                message += '</ul>';
                return this.Swal.fire({
                    title: 'Attention',
                    icon: 'warning',
                    html: message
                });
            }

            const formData = {
                name: form.name,
                username: form.username,
                email: form.email,
                password: form.password,
                confirm_password: form.confirm_password,
            }

            await this.axios.post(`${this.urlApi}register`, formData)
                .then(res => {
                    if (res.data.status == 200) {
                        this.Swal.fire(
                            'Success',
                            res.data.message,
                            'success'
                        ).then((res) => {
                            return this.$router.push({ name: 'login' });
                        });
                    } else {
                        return this.Swal.fire(
                            'Attention',
                            res.data.message,
                            'warning'
                        );
                    }
                })
                .catch((err) => {
                    return this.Swal.fire(
                        'Attention',
                        err.message,
                        'warning'
                    );
                });
        }
    }
}
</script>
<style scoped>
.gradient-custom-2 {
    /* fallback for old browsers */
    background: #fccb90;

    /* Chrome 10-25, Safari 5.1-6 */
    background: -webkit-linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);

    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    background: linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);
}

@media (min-width: 768px) {
    .gradient-form {
        height: 100vh !important;
    }
}

@media (min-width: 769px) {
    .gradient-custom-2 {
        border-top-right-radius: .3rem;
        border-bottom-right-radius: .3rem;
    }
}
</style>