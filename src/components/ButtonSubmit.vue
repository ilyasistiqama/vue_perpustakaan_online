<template>
    <div class="div">
        <div class="d-grid gap-2 mt-2">
            <button class="btn btn-primary" type="button">{{ buttonText }}</button>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        buttonText: String,
    }
}
</script>