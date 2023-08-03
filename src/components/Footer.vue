<template>
    <div class="mt-3">
        <footer class="footer bg-light text-center text-lg-start">
            <!-- Copyright -->
            <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
                © {{ getYear() }} Copyright:
                <a class="text-dark" href="https://www.linkedin.com/in/muh-ilyas-istiqama/" target="_blank">About Me</a>
            </div>
            <!-- Copyright -->
        </footer>
    </div>
</template>
<script>
export default {
    methods: {
        getYear() {
            const date = new Date();
            const year = date.getFullYear();
            return year;
        }
    }
}
</script>
<style scoped>
</style>