<template>
    <div>
        <Navbar v-on:logout="actionLogout()" />
        <div class="container mt-3">
            <!-- render vue router -->
            <router-view></router-view>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import Footer from '../components/Footer.vue';
import Navbar from '../components/Navbar.vue';
export default {
    components: {
        Navbar,
        Footer
    },
    methods: {
        actionLogout() {
            this.Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Logout Berhasil. Terimakasih Sudah Menggunakan Aplikasi Perpustakaan :-)'
            }).then((res) => {
                localStorage.removeItem('_token');
                this.$router.push({ path: '/login' });
            })
        }
    }
}
</script>