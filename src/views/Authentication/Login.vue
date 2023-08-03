<template>
    <section>
        <div class="container py-5">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col col-xl-10">
                    <div class="card" style="border-radius: 1rem;">
                        <div class="row g-0">
                            <div class="col-md-6 col-lg-5 d-none d-md-block">
                                <img src="../../assets/login-photo.jpg" alt="login form" class="img-fluid"
                                    style="border-radius: 1rem 0 0 1rem;" />
                            </div>
                            <div class="col-md-6 col-lg-7 d-flex align-items-center">
                                <div class="card-body p-4 p-lg-5 text-black">

                                    <form>

                                        <div class="d-flex align-items-center mb-3 pb-1">
                                            <i class="fas fa-cubes fa-2x me-3" style="color: #ff6219;">
                                                <img src="../../assets/logo-banggai.png" style="width: 80px;height: 90px;"
                                                    alt="logo"></i>
                                            <span class="h1 fw-bold mb-0">Perpusda Luwuk Banggai</span>
                                        </div>

                                        <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Sign into your account
                                        </h5>

                                        <div class="form-outline mb-4">
                                            <input type="text" id="username-form" class="form-control form-control-lg"
                                                v-model="form.username" />
                                            <label class="form-label" for="username-form">Username</label>
                                        </div>

                                        <div class="form-outline mb-4">
                                            <input type="password" id="password-form" class="form-control form-control-lg"
                                                v-model="form.password" />
                                            <label class="form-label" for="password-form">Password</label>
                                        </div>

                                        <div class="pt-1 mb-4">
                                            <button class="btn btn-dark btn-lg btn-block" type="button"
                                                @click="login(form)">Login</button>
                                        </div>

                                        <p class="mb-5 pb-lg-2" style="color: #393f81;">Don't have an account? <router-link
                                                :to="{ name: 'register' }">Register here</router-link>
                                        </p>
                                        <a href="#" class="small text-muted">Terms of use. </a>
                                        <a href="#" class="small text-muted">Privacy policy</a>
                                    </form>

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
                password: '',
            },
            errors: [],
        }
    },
    methods: {
        async login(form) {
            this.errors = [];

            if (!this.form.username) {
                this.errors.push('Username Required.')
            }

            if (!this.form.password) {
                this.errors.push('Password Required.')
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
                username: form.username,
                password: form.password
            }

            await this.axios.post(`${this.urlApi}login`, formData)
                .then(res => {
                    if (res.data.status == 200) {
                        this.Swal.fire(
                            'Success',
                            res.data.message,
                            'success'
                        ).then((resp) => {
                            localStorage.setItem('_token', res.data.data.token);
                            localStorage.setItem('_role', res.data.data.user.roles[0].name);
                            localStorage.setItem('_id_user', res.data.data.user.id);
                            return this.$router.push({ name: 'dashboard' });
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
                })
        }
    }
}
</script>