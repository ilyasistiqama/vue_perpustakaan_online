<template>
    <div class="card">
        <div class="card-body">
            <div class="row my-4">
                <CardInDashboard afterValue="Buah" header="Buku" icons="fa-solid fa-book" :value="this.totalBuku" />
                <CardInDashboard afterValue="Buah" header="Stock" icons="fa-solid fa-layer-group" :value="this.totalStok" />
            </div>
            <div class="row my-4">
                <CardInDashboard afterValue="Orang" header="Member" icons="fa-solid fa-users" :value="this.totalMember" />
                <CardInDashboard afterValue="Orang" header="Pegawai" icons="fa-solid fa-user-tie" :value="this.totalPegawai" />
            </div>
            <div class="row my-4">
                <CardInDashboard afterValue="Kali" header="Dipinjam" icons="fa-solid fa-handshake" :value="this.totalDipinjam" />
                <CardInDashboard afterValue="Kali" header="Dikembalikan" icons="fa-solid fa-hand-holding-heart" :value="this.totalDikembalikan" />
            </div>
        </div>
    </div>
</template>

<script>
import CardInDashboard from '../../components/CardInDashboard.vue';
export default {
    components: {
        CardInDashboard,
    },
    data() {
        return {
            totalBuku: '0',
            totalStok: '0',
            totalMember: '0',
            totalPegawai: '0',
            totalDipinjam: '0',
            totalDikembalikan: '0',
        }
    },   
    methods: {
        async getDataDashboard(){
            this.axios.get(`${this.urlApi}book/dashboard`,
            {
                'headers': {
                    'Authorization': 'Bearer ' + localStorage.getItem('_token')
                }
            })
            .then((res) => {
                this.totalBuku = res.data.data.dashboard.totalBuku.toString();
                this.totalStok = res.data.data.dashboard.totalStok.toString();
                this.totalMember = res.data.data.dashboard.totalMember.toString();
                this.totalPegawai = res.data.data.dashboard.totalPegawai.toString();
                this.totalDipinjam = res.data.data.dashboard.totalDipinjam.toString();
                this.totalDikembalikan = res.data.data.dashboard.totalDikembalikan.toString();
            });
        }
    }, 
    async mounted() {
        await this.getDataDashboard()
    },
}
</script>