<template>
    <div class="error-message">
        <h1>{{ error }}</h1>
        <h3>{{ message }}</h3>
        <div class="d-flex justify-content-center">
            <router-link :to="{ name: 'dashboard' }" class="btn btn-primary mt-2">Go to dashboard</router-link>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            error: 401,
            message: 'You are not authorized for selected action, Sorry :('
        }
    }
}
</script>
<style scoped>
.error-message{
  position: fixed;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>