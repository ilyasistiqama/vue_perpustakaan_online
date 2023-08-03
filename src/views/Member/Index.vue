
<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">List Member</h5>
            <div class="table-responsive">
                <table class="table table-bordered border-primary mt-3">
                    <thead>
                        <tr>
                            <th style="width: 5%;" scope="col">#</th>
                            <th scope="col">Foto</th>
                            <th scope="col">Nama</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(member, index) in listMember.data" :key="member.id">
                            <th scope="row">{{ (listMember.current_page - 1) * listMember.per_page + (index + 1) }}</th>
                            <td><img src="https://xsgames.co/randomusers/avatar.php?g=pixel"
                                    style="width: 45px; height: 45px" class="rounded-circle" alt="Foto Member"></td>
                            <td>{{ member.name }}</td>
                            <td>{{ member.email }}</td>
                            <td>{{ member.roles[0].name }}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="pagination justify-content-end">
                    <vue-awesome-paginate :total-items="listMember.total" :items-per-page="listMember.per_page"
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
            listMember: [],
            search: null,
        }
    },
    methods: {
        async getMember() {
            await this.axios.get(`${this.urlApi}user/all`, {
                'headers': {
                    'Authorization': 'Bearer ' + localStorage.getItem('_token')
                },
                'params': {
                    page: this.page,
                    per_page: 10
                },
            }).then((res) => {
                this.listMember = res.data.data.users
            })
        },
        async onClickHandler(page) {
            this.page = page;
            await this.getMember();
        },

    },
    async mounted() {
        await this.getMember();
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