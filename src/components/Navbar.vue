<template>
    <div>
        <nav class="navbar navbar-expand-lg" style="background-color: #e3f2fd;">
            <div class="container-fluid">
                <router-link :to="{ name: 'dashboard' }" class="navbar-brand">
                    <img src="../assets/logo-banggai.png" alt="login form" class="img-fluid"
                        style="width: 30px;height: 30px;" />
                </router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <router-link :to="{ name: 'dashboard' }" class="nav-link"
                                aria-current="page">Dashboard</router-link>
                        </li>
                        <li class="nav-item" v-if="role == 'admin'">
                            <router-link :to="{ name: 'kategori-buku' }" class="nav-link" aria-current="page">Kategori
                                Buku</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'buku' }" class="nav-link" aria-current="page">Buku</router-link>
                        </li>
                        <li class="nav-item" v-if="role == 'admin'">
                            <router-link :to="{ name: 'member' }" class="nav-link" aria-current="page">Member</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'peminjaman' }" class="nav-link" aria-current="page">Peminjaman</router-link>
                        </li>
                    </ul>
                    <li class="nav-item d-flex">
                        <button class="nav-link" aria-current="page" href="#" @click="logout()">Logout</button>
                    </li>
                </div>
            </div>
        </nav>
    </div>
</template>
<script>
export default {
    data(){
        return {
            role: localStorage.getItem('_role'),
        }
    },
    methods: {
        logout() {
            this.$emit('logout');
        }
    }
}
</script>
